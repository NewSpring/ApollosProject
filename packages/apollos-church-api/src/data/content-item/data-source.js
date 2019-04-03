import { ContentItem as oldContentItem } from '@apollosproject/data-connector-rock';
import natural from 'natural';
import sanitizeHtmlNode from 'sanitize-html';
// import { get } from 'lodash';

// import ApollosConfig from '@apollosproject/config';

// const { ROCK_CONSTANTS } = ApollosConfig;

// TODO: Move this to own UTILS file
// const enforceProtocol = (uri) => (uri.startsWith('//') ? `https:${uri}` : uri);

// TODO: Move this to own UTILS file
// const createImageUrlFromGuid = (uri) =>
//   console.log(uri) || uri.split('-').length === 5
//     ? `${ApollosConfig.ROCK.IMAGE_URL}?guid=${uri}`
//     : enforceProtocol(uri);

export default class ContentItem extends oldContentItem.dataSource {
  createSummary = ({ content, attributeValues: { summary = {} } }) => {
    if (summary.value) return summary.value;
    if (!content || typeof content !== 'string') return '';
    // Protect against 0 length sentences (tokenizer will throw an error)
    if (content.split(' ').length === 1) return '';

    const tokenizer = new natural.SentenceTokenizer();
    return tokenizer.tokenize(
      sanitizeHtmlNode(content, {
        allowedTags: [],
        allowedAttributes: [],
      })
    )[0];
  };

  //   attributeIsVideo = ({ key, attributeValues, attributes }) =>
  //     attributes[key].fieldTypeId === ROCK_CONSTANTS.VIDEO_FILE ||
  //     attributes[key].fieldTypeId === ROCK_CONSTANTS.VIDEO_URL ||
  //     attributes[key].fieldTypeId === ROCK_CONSTANTS.WISTIA ||
  //     (key.toLowerCase().includes('video') &&
  //       typeof attributeValues[key].value === 'string' &&
  //       attributeValues[key].value.startsWith('http')); // looks like a video url

  //   attributeIsImage = ({ key, attributeValues, attributes }) =>
  //     attributes[key].fieldTypeId === ROCK_CONSTANTS.IMAGE ||
  //     attributes[key].fieldTypeId === ROCK_CONSTANTS.S3_ASSET ||
  //     (key.toLowerCase().includes('image') &&
  //       typeof attributeValues[key].value === 'string' &&
  //       attributeValues[key].value.startsWith('http')); // looks like an image url

  //   attributeIsAudio = ({ key, attributeValues, attributes }) =>
  //     attributes[key].fieldTypeId === ROCK_CONSTANTS.AUDIO_FILE ||
  //     attributes[key].fieldTypeId === ROCK_CONSTANTS.AUDIO_URL ||
  //     attributes[key].fieldTypeId === ROCK_CONSTANTS.S3_ASSET ||
  //     (key.toLowerCase().includes('audio') &&
  //       typeof attributeValues[key].value === 'string' &&
  //       attributeValues[key].value.startsWith('http')); // looks like an audio url

  //   hasMedia = ({ attributeValues, attributes }) =>
  //     Object.keys(attributes).filter((key) =>
  //       this.attributeIsVideo({
  //         key,
  //         attributeValues,
  //         attributes,
  //       })
  //     ).length ||
  //     Object.keys(attributes).filter((key) =>
  //       this.attributeIsAudio({
  //         key,
  //         attributeValues,
  //         attributes,
  //       })
  //     ).length;

  //   getImages = ({ attributeValues, attributes }) => {
  //     const imageKeys = Object.keys(attributes).filter((key) =>
  //       this.attributeIsImage({
  //         key,
  //         attributeValues,
  //         attributes,
  //       })
  //     );
  //     return imageKeys.map((key) => ({
  //       __typename: 'ImageMedia',
  //       key,
  //       name: attributes[key].name,
  //       sources: attributeValues[key].value
  //         ? [{ uri: createImageUrlFromGuid(attributeValues[key].value) }]
  //         : [],
  //     }));
  //   };

  //   getVideos = ({ attributeValues, attributes }) => {
  //     const videoKeys = Object.keys(attributes).filter((key) =>
  //       this.attributeIsVideo({
  //         key,
  //         attributeValues,
  //         attributes,
  //       })
  //     );
  //     return videoKeys.map((key) => ({
  //       __typename: 'VideoMedia',
  //       key,
  //       name: attributes[key].name,
  //       embedHtml: get(attributeValues, 'videoEmbed.value', null), // TODO: this assumes that the key `VideoEmebed` is always used on Rock
  //       sources: attributeValues[key].value
  //         ? [{ uri: attributeValues[key].value }]
  //         : [],
  //     }));
  //   };

  //   getAudios = ({ attributeValues, attributes }) => {
  //     const audioKeys = Object.keys(attributes).filter((key) =>
  //       this.attributeIsAudio({
  //         key,
  //         attributeValues,
  //         attributes,
  //       })
  //     );
  //     return audioKeys.map((key) => ({
  //       __typename: 'AudioMedia',
  //       key,
  //       name: attributes[key].name,
  //       sources: attributeValues[key].value
  //         ? [{ uri: attributeValues[key].value }]
  //         : [],
  //     }));
  //   };

  //   async getCoverImage(root) {
  //     const pickBestImage = (images) => {
  //       // TODO: there's probably a _much_ more explicit and better way to handle this
  //       const squareImage = images.find((image) =>
  //         image.key.toLowerCase().includes('square')
  //       );
  //       if (squareImage) return { ...squareImage, __typename: 'ImageMedia' };
  //       return { ...images[0], __typename: 'ImageMedia' };
  //     };

  //     const ourImages = this.getImages(root).filter(
  //       (image) => image.sources.length
  //     ); // filter images w/o URLs
  //     if (ourImages.length) return pickBestImage(ourImages);

  //     // If no image, check parent for image:
  //     const parentItemsCursor = await this.getCursorByChildContentItemId(root.id);
  //     if (!parentItemsCursor) return null;

  //     const parentItems = await parentItemsCursor.get();

  //     if (parentItems.length) {
  //       const parentImages = parentItems
  //         .map(this.getImages)
  //         .find((images) => images.length);

  //       if (!parentImages) return null;

  //       const validParentImages = parentImages.filter(
  //         (image) => image.sources.length
  //       );

  //       if (validParentImages && validParentImages.length)
  //         return pickBestImage(validParentImages);
  //     }

  //     return null;
  //   }
}
