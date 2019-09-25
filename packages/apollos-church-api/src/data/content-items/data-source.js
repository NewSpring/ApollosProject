import { ContentItem as oldContentItem } from '@apollosproject/data-connector-rock';
import { get } from 'lodash';
import ApollosConfig from '@apollosproject/config';
import { parseKeyValueAttribute } from '@apollosproject/rock-apollo-data-source';
import { createAssetUrl } from '../utils';

import getScripturesFromTemplate from './getScripturesFromTemplate';

const { ROCK, ROCK_CONSTANTS } = ApollosConfig;

export default class ContentItem extends oldContentItem.dataSource {
  getContentItemScriptures = async (id) => {
    try {
      const request = await this.post(
        'Lava/RenderTemplate',
        getScripturesFromTemplate(id)
      );

      return await JSON.parse(request.replace(/\s/g, '')).map((item) => {
        let scripture;
        return Object.keys(item).reduce((previous, key) => {
          scripture = `${item[previous]} ${item[key]}`;
          return scripture;
        });
      });
    } catch (error) {
      return '';
    }
  };

  getWistiaVideoUri = async (wistiaHashedId) => {
    try {
      const videoData = await this.request('WistiaMedias')
        .filter(`WistiaHashedId eq '${wistiaHashedId}'`)
        .select('MediaData')
        .get();

      const mediaData = JSON.parse(videoData[0].mediaData);
      const videos = mediaData.assets.filter(
        (asset) => asset.type === 'HlsVideoFile' && asset.height === 720
      );
      if (!videos.length) return '';
      return videos[0].url.replace('.bin', '.m3u8');
    } catch (error) {
      return '';
    }
  };

  attributeIsVideo = ({ key, attributes }) =>
    attributes[key].fieldTypeId === ROCK_CONSTANTS.WISTIA;

  attributeIsImage = ({ key, attributeValues, attributes }) => {
    try {
      return (
        attributes[key].fieldTypeId === ROCK_CONSTANTS.S3_ASSET &&
        !get(JSON.parse(attributeValues[key].value), 'Key', '')
          .split('/')
          .includes('audio') &&
        !get(JSON.parse(attributeValues[key].value), 'Key', '')
          .split('/')
          .includes('video')
      );
    } catch (error) {
      return attributes[key].fieldTypeId === ROCK_CONSTANTS.S3_ASSET;
    }
  };

  attributeIsAudio = ({ key, attributeValues, attributes }) => {
    try {
      return (
        attributes[key].fieldTypeId === ROCK_CONSTANTS.S3_ASSET &&
        get(JSON.parse(attributeValues[key].value), 'Key', '')
          .split('/')
          .includes('audio')
      );
    } catch (error) {
      return attributes[key].fieldTypeId === ROCK_CONSTANTS.S3_ASSET;
    }
  };

  getImages = ({ attributeValues, attributes }) => {
    const imageKeys = Object.keys(attributes).filter((key) =>
      this.attributeIsImage({
        key,
        attributeValues,
        attributes,
      })
    );
    return imageKeys.map((key) => ({
      __typename: 'ImageMedia',
      key,
      name: attributes[key].name,
      sources: attributeValues[key].value
        ? [{ uri: createAssetUrl(JSON.parse(attributeValues[key].value)) }]
        : [],
    }));
  };

  getVideos = ({ attributeValues, attributes }) => {
    const videoKeys = Object.keys(attributes).filter((key) =>
      this.attributeIsVideo({
        key,
        attributeValues,
        attributes,
      })
    );

    return videoKeys.map((key) => ({
      __typename: 'VideoMedia',
      key,
      name: attributes[key].name,
      embedHtml: get(attributeValues, 'videoEmbed.value', null),
      sources: attributeValues[key].value
        ? [
            {
              uri: this.getWistiaVideoUri(attributeValues[key].value),
            },
          ]
        : [],
    }));
  };

  getAudios = ({ attributeValues, attributes }) => {
    const audioKeys = Object.keys(attributes).filter((key) =>
      this.attributeIsAudio({
        key,
        attributeValues,
        attributes,
      })
    );
    return audioKeys.map((key) => ({
      __typename: 'AudioMedia',
      key,
      name: attributes[key].name,
      sources:
        Object.keys(attributeValues[key].value).length !== 0
          ? [
              {
                uri:
                  typeof attributeValues[key].value === 'string'
                    ? createAssetUrl(JSON.parse(attributeValues[key].value))
                    : createAssetUrl(attributeValues[key].value),
              },
            ]
          : [],
    }));
  };

  getShareUrl = async (id, contentChannelId) => {
    const contentChannel = await this.context.dataSources.ContentChannel.getFromId(
      contentChannelId
    );
    const slug = await this.request('ContentChannelItemSlugs')
      .filter(`ContentChannelItemId eq ${id}`)
      .first();
    return `${ROCK.SHARE_URL + contentChannel.channelUrl}/${slug.slug}`;
  };

  getFeatures({ attributeValues }) {
    const features = [];
    const { Features } = this.context.dataSources;

    const rawFeatures = get(attributeValues, 'features.value', '');
    parseKeyValueAttribute(rawFeatures).forEach(({ key, value }, i) => {
      switch (key) {
        case 'scripture':
          features.push(
            Features.createScriptureFeature({
              reference: value,
              id: `${attributeValues.features.id}-${i}`,
            })
          );
          break;
        case 'text':
          features.push(
            Features.createTextFeature({
              text: value,
              id: `${attributeValues.features.id}-${i}`,
            })
          );
          break;
        case 'note':
          features.push(
            Features.createNoteFeature({
              placeholder: value,
              id: `${attributeValues.features.id}-${i}`,
            })
          );
          break;
        case 'header':
          features.push(
            Features.createHeaderFeature({
              body: value,
              id: `${attributeValues.features.id}-${i}`,
            })
          );
          break;
        default:
          console.warn(`Received invalid feature key: ${key}`);
      }
    });
    return features;
  }

  getCommunicator = async ({ value: matrixItemGuid } = {}) => {
    if (!matrixItemGuid) return null;
    const {
      attributeValues: { communicator: { value: personAliasGuid } = {} } = {},
    } = await this.request('/AttributeMatrixItems')
      .filter(`AttributeMatrix/Guid eq guid'${matrixItemGuid}'`)
      .first();
    const { personId } = await this.request('/PersonAlias')
      .filter(`Guid eq guid'${personAliasGuid}'`)
      .first();
    return this.context.dataSources.Person.getFromId(personId);
  };

  getBySlug = async (slug) => {
    const contentItemSlug = await this.request('ContentChannelItemSlugs')
      .filter(`Slug eq '${slug}'`)
      .first();
    if (!contentItemSlug) throw new Error('Slug does not exist.');

    return this.getFromId(`${contentItemSlug.contentChannelItemId}`);
  };
}
