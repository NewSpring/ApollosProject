import { get } from 'lodash';
import { ContentItem as originalContentItem } from '@apollosproject/data-connector-rock';
import { resolverMerge } from '@apollosproject/server-core';

import ApollosConfig from '@apollosproject/config';

const { ROCK_MAPPINGS } = ApollosConfig;

const resolver = {
  Query: {
    externalLink: (root, { slug }, { dataSources }) =>
      dataSources.ContentItem.getBySlug(slug),
  },
  ContentSeriesContentItem: {
    theme: (contentItem) => ({
      type: () => 'LIGHT',
      colors: () => ({
        primary: `${get(
          contentItem,
          'attributeValues.backgroundColor.value',
          '#fff'
        )}`,
        secondary: '#6bac43',
        screen: '#F8F7F4',
        paper: `#fff`,
      }),
    }),
  },
  DevotionalContentItem: {
    scriptures: async ({ id }, args, { dataSources }) => {
      const scriptures = await dataSources.ContentItem.getContentItemScriptures(
        id
      );
      if (scriptures.length) {
        return dataSources.Scripture.getScriptures(scriptures);
      }
      return [];
    },
  },
  ContentItem: {
    __resolveType: async (
      { attributeValues, attributes, contentChannelId },
      { dataSources: { ContentItem } }
    ) => {
      // if we have defined an ContentChannelId based maping in the YML file, use it!
      if (
        Object.values(ROCK_MAPPINGS.CONTENT_ITEM).some(
          ({ ContentChannelId }) =>
            ContentChannelId && ContentChannelId.includes(contentChannelId)
        )
      ) {
        return Object.keys(ROCK_MAPPINGS.CONTENT_ITEM).find((key) => {
          const value = ROCK_MAPPINGS.CONTENT_ITEM[key];
          return (
            value.ContentChannelId &&
            value.ContentChannelId.includes(contentChannelId)
          );
        });
      }

      if (ContentItem.hasMedia({ attributeValues, attributes })) {
        return 'MediaContentItem';
      }

      return 'UniversalContentItem';
    },
  },
  SharableContentItem: {
    url: ({ id, contentChannelId }, args, { dataSources }) =>
      dataSources.ContentItem.getShareURL(id, contentChannelId),
  },
  WeekendContentItem: {
    communicator: () => null,
    sermonDate: ({ attributeValues: { actualDate: { value } = {} } = {} }) =>
      value,
  },
};

export default resolverMerge(resolver, originalContentItem);
