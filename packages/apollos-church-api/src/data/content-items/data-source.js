import { ContentItem as oldContentItem } from '@apollosproject/data-connector-rock';
import { get } from 'lodash';
import ApollosConfig from '@apollosproject/config';
import { parseKeyValueAttribute } from '@apollosproject/rock-apollo-data-source';
import sanitizeHtmlNode from 'sanitize-html';
import { createAssetUrl } from '../utils';

const { ROCK, ROCK_CONSTANTS } = ApollosConfig;

export default class ContentItem extends oldContentItem.dataSource {
  getContentItemScriptures = async ({ value: matrixItemGuid }) => {
    const {
      dataSources: { Scripture, MatrixItem },
    } = this.context;
    if (!matrixItemGuid) return null;
    const matrixItems = await MatrixItem.getItemsFromGuid(matrixItemGuid);
    const references = await Promise.all(
      matrixItems.map(
        async ({
          attributeValues: {
            book: { value: bookGuid },
            reference: { value: reference },
          } = {},
        }) => {
          const { value: book } = await this.request('/DefinedValues')
            .filter(`Guid eq guid'${bookGuid}'`)
            .first();
          return `${book} ${reference}`;
        }
      )
    );

    const query = references.join(',');
    return query !== '' ? Scripture.getScriptures(query) : null;
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
        ? [
            {
              uri: createAssetUrl(JSON.parse(attributeValues[key].value)),
            },
          ]
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

  getShareUrl = async ({ id, contentChannelId }, parentChannelId) => {
    const contentChannel = await this.context.dataSources.ContentChannel.getFromId(
      contentChannelId
    );
    const slug = await this.request('ContentChannelItemSlugs')
      .filter(`ContentChannelItemId eq ${id}`)
      .first();
    let parent = null;
    let parentSlug = null;
    if (parentChannelId) {
      parent = await this.getParent(id, parentChannelId);
      parentSlug = await this.request('ContentChannelItemSlugs')
        .filter(`ContentChannelItemId eq ${parent.id}`)
        .first();
    }
    return `${ROCK.SHARE_URL + contentChannel.channelUrl}/${
      parent ? `${parentSlug.slug}/` : ''
    }${slug.slug}`;
  };

  getParent = async (childId, channelId) => {
    const parentAssociations = await this.request(
      'ContentChannelItemAssociations'
    )
      .filter(`ChildContentChannelItemId eq ${childId}`)
      .get();
    const parentFilter = parentAssociations.map(
      ({ contentChannelItemId }) => `Id eq ${contentChannelItemId}`
    );
    return this.request()
      .filterOneOf(parentFilter)
      .andFilter(`ContentChannelId eq ${channelId}`)
      .first();
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

  getCommunicators = async ({ value: matrixItemGuid } = {}) => {
    const {
      dataSources: { MatrixItem },
    } = this.context;
    if (!matrixItemGuid) return [];
    const matrixItems = await MatrixItem.getItemsFromGuid(matrixItemGuid);
    const communicators = await Promise.all(
      matrixItems.map(async (item) => {
        const {
          attributeValues: {
            communicator: { value: personAliasGuid } = {},
          } = {},
        } = item;
        // some lines may be guest communicators
        if (personAliasGuid === '') return null;
        const { personId } = await this.request('/PersonAlias')
          .filter(`Guid eq guid'${personAliasGuid}'`)
          .first();
        return this.context.dataSources.Person.getFromId(personId);
      })
    );
    // filter out null lines
    return communicators.filter((person) => person);
  };

  getGuestCommunicators = async ({ value: matrixItemGuid } = {}) => {
    const {
      dataSources: { MatrixItem },
    } = this.context;
    if (!matrixItemGuid) return [];
    const matrixItems = await MatrixItem.getItemsFromGuid(matrixItemGuid);
    const guests = matrixItems.map(
      ({
        attributeValues: { guestCommunicator: { value: name } = {} } = {},
      } = {}) => name
    );
    // some lines may be communicators, filter those out
    return guests.filter((name) => name !== '');
  };

  getBySlug = async (slug) => {
    const contentItemSlug = await this.request('ContentChannelItemSlugs')
      .filter(`Slug eq '${slug}'`)
      .first();
    if (!contentItemSlug) throw new Error('Slug does not exist.');

    return this.getFromId(`${contentItemSlug.contentChannelItemId}`);
  };

  coreSummaryMethod = this.createSummary;

  createSummary = (root) => {
    const { attributeValues } = root;
    const summary = get(attributeValues, 'summary.value', '');
    if (summary !== '') {
      return sanitizeHtmlNode(summary, {
        allowedTags: [],
        allowedAttributes: [],
      });
    }
    return this.coreSummaryMethod(root);
  };

  corePickBestImage = this.pickBestImage;

  pickBestImage = ({ images }) => {
    // TODO: there's probably a _much_ more explicit and better way to handle this
    const appImage = images.find((image) =>
      image.key.toLowerCase().includes('app')
    );
    if (appImage) return { ...appImage, __typename: 'ImageMedia' };

    return this.corePickBestImage({ images });
  };
}
