import { ContentItem as originalContentItem } from '@apollosproject/data-connector-rock';
import { schemaMerge } from '@apollosproject/server-core';
// import { get } from 'lodash';

import ApollosConfig from '@apollosproject/config';

const { ROCK_MAPPINGS } = ApollosConfig;

const resolver = {
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
};

export default schemaMerge(resolver, originalContentItem);
