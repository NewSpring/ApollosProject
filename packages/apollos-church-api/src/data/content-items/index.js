import fetch from 'node-fetch';

const getContentVideo = async (id) => {
  if (!id) return null;
  // todo: hook this up to the caching system
  return fetch(
    `https://api.wistia.com/v1/medias/${id}.json?api_password=${
      process.env.WISTIA_KEY
    }`
  ).then((response) => {
    if (response.status >= 400) {
      // todo: handle this error
      return {};
    }
    return response.json();
  });
};

export const resolver = {
  MediaContentItem: {
    videos: async ({ attributeValues }) => {
      const video = await getContentVideo(attributeValues.video.value);
      if (video && video.assets) {
        const videoUrls = await video.assets.filter(
          (item) => item.type === 'MdMp4VideoFile'
        );
        return [
          {
            __typename: 'VideoMedia',
            sources: [
              {
                uri: videoUrls[0].url,
              },
            ],
          },
        ];
      }
      return [
        {
          __typename: 'VideoMedia',
          sources: [],
        },
      ];
    },
    theme: ({ attributeValues }) => ({
      colors: {
        primary: '#6bac43',
        secondary: '#6bac43',
        paper: attributeValues.backgroundColor
          ? `#${attributeValues.backgroundColor.value}`
          : '#fff',
        screen: attributeValues.backgroundColor
          ? `#${attributeValues.backgroundColor.value}`
          : '#F8F7F4',
      },
    }),
  },
  UniversalContentItem: {
    theme: ({ attributeValues }) => ({
      colors: {
        primary: '#6bac43',
        secondary: '#6bac43',
        paper: attributeValues.backgroundColor
          ? `#${attributeValues.backgroundColor.value}`
          : '#fff',
        screen: attributeValues.backgroundColor
          ? `#${attributeValues.backgroundColor.value}`
          : '#F8F7F4',
      },
    }),
  },
  DevotionalContentItem: {
    theme: ({ attributeValues }) => ({
      colors: {
        primary: '#6bac43',
        secondary: '#6bac43',
        paper: attributeValues.backgroundColor
          ? `#${attributeValues.backgroundColor.value}`
          : '#fff',
        screen: attributeValues.backgroundColor
          ? `#${attributeValues.backgroundColor.value}`
          : '#F8F7F4',
      },
    }),
  },
};

export default resolver;
