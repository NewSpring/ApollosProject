import { ContentItem as oldContentItem } from '@apollosproject/data-connector-rock';
import { get, flatten } from 'lodash';
import ApollosConfig from '@apollosproject/config';
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

      const mediaData = await JSON.parse(videoData[0].mediaData);

      return get(mediaData, 'assets[0].url', '');
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
        ? [{ uri: createAssetUrl(attributeValues[key].value) }]
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
      embedHtml: get(attributeValues, 'videoEmbed.value', null), // TODO: this assumes that the key `VideoEmebed` is always used on Rock
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

  async getCoverImage(root) {
    const pickBestImage = (images) => {
      // TODO: there's probably a _much_ more explicit and better way to handle this
      const squareImage = images.find((image) =>
        image.key.toLowerCase().includes('square')
      );
      if (squareImage) return { ...squareImage, __typename: 'ImageMedia' };
      return { ...images[0], __typename: 'ImageMedia' };
    };

    const withSources = (image) => image.sources.length;

    // filter images w/o URLs
    const ourImages = this.getImages(root).filter(withSources);

    if (ourImages.length) return pickBestImage(ourImages);

    // If no image, check parent for image:
    const parentItemsCursor = await this.getCursorByChildContentItemId(root.id);
    if (!parentItemsCursor) return null;

    const parentItems = await parentItemsCursor.get();

    if (parentItems.length) {
      const parentImages = flatten(parentItems.map(this.getImages));
      const validParentImages = parentImages.filter(withSources);

      if (validParentImages && validParentImages.length)
        return pickBestImage(validParentImages);
    }

    return null;
  }

  getShareURL = async (id, contentChannelId) => {
    try {
      const contentChannel = await this.context.dataSources.ContentChannel.getFromId(
        contentChannelId
      );
      const slug = await this.request('ContentChannelItemSlugs')
        .filter(`ContentChannelItemId eq ${id}`)
        .first();
      return `${ROCK.SHARE_URL + contentChannel.channelUrl}/${slug.slug}`;
    } catch (error) {
      console.error(error);
      return '';
    }
  };
}
