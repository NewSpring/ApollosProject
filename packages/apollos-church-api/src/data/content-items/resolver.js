import { ContentItem as originalContentItem } from '@apollosproject/data-connector-rock';
import { resolverMerge } from '@apollosproject/server-core';

import ApollosConfig from '@apollosproject/config';

const { ROCK_MAPPINGS } = ApollosConfig;

const resolver = {
  Query: {
    contentItemFromSlug: (root, { slug }, { dataSources }) =>
      dataSources.ContentItem.getBySlug(slug),
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

    // TODO temp fix, remove after this is merged
    // https://github.com/ApollosProject/apollos-prototype/pull/1061
    sharing: (root, args, { dataSources: { ContentItem } }) => ({
      url: ContentItem.getShareUrl(root.id, root.contentChannelId),
      title: 'Share via ...',
      message: `${root.title} - ${ContentItem.createSummary(root)}`,
    }),
  },
  SharableContentItem: {
    url: ({ id, contentChannelId }, args, { dataSources }) =>
      dataSources.ContentItem.getShareURL(id, contentChannelId),
  },
  WeekendContentItem: {
    communicator: (
      { attributeValues: { communicators } = {} },
      args,
      { dataSources }
    ) => dataSources.ContentItem.getCommunicator(communicators),
    sermonDate: ({ attributeValues: { actualDate: { value } = {} } = {} }) =>
      value,
  },
};

export default resolverMerge(resolver, originalContentItem);
