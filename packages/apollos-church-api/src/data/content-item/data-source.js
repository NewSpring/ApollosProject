import { ContentItem as oldContentItem } from '@apollosproject/data-connector-rock';
import natural from 'natural';
import sanitizeHtmlNode from 'sanitize-html';
import { get } from 'lodash';
import ApollosConfig from '@apollosproject/config';
import getScripturesFromTemplate from './getScripturesFromTemplate';

const { ROCK_CONSTANTS, ROCK, ROCK_MAPPINGS } = ApollosConfig;

// TODO: Move this to own UTILS file
const createAssetUrl = (value) =>
  `${ROCK.IMAGE_URL}/${
    ROCK_MAPPINGS.ASSET_STORAGE_PROVIDERS[`${value.AssetStorageProviderId}`]
  }/${value.Key}`;

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
      console.log(error);
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

  createSummary = ({ content, attributeValues: { summary = {} } }) => {
    let htmlNode = content;

    if (summary.value) {
      htmlNode = summary.value;
    }
    if (!htmlNode || typeof htmlNode !== 'string') return '';
    // Protect against 0 length sentences (tokenizer will throw an error)
    if (htmlNode.split(' ').length === 1) return '';

    const tokenizer = new natural.SentenceTokenizer();
    return tokenizer.tokenize(
      sanitizeHtmlNode(htmlNode, {
        allowedTags: [],
        allowedAttributes: [],
      })
    )[0];
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
      sources: Object.keys(attributeValues[key].value).length
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

    const ourImages = this.getImages(root).filter(
      (image) => image.sources.length
    ); // filter images w/o URLs
    if (ourImages.length) return pickBestImage(ourImages);

    // If no image, check parent for image:
    const parentItemsCursor = await this.getCursorByChildContentItemId(root.id);
    if (!parentItemsCursor) return null;

    const parentItems = await parentItemsCursor.get();

    if (parentItems.length) {
      const parentImages = parentItems
        .map(this.getImages)
        .find((images) => images.length);

      if (!parentImages) return null;

      const validParentImages = parentImages.filter(
        (image) => image.sources.length
      );

      if (validParentImages && validParentImages.length)
        return pickBestImage(validParentImages);
    }

    return null;
  }
}
