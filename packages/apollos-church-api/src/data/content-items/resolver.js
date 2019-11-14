import { ContentItem as originalContentItem } from '@apollosproject/data-connector-rock';
import { resolverMerge } from '@apollosproject/server-core';

import ApollosConfig from '@apollosproject/config';

const { ROCK_MAPPINGS } = ApollosConfig;

// TODO temp fix, remove after this is merged
// https://github.com/ApollosProject/apollos-prototype/pull/1061
const defaultResolvers = {
  sharing: (root, args, { dataSources: { ContentItem } }) => ({
    url: ContentItem.getShareUrl(root),
    title: 'Share via ...',
    message: `${root.title} - ${ContentItem.createSummary(root)}`,
  }),
};

const resolver = {
  Query: {
    contentItemFromSlug: (root, { slug }, { dataSources }) =>
      dataSources.ContentItem.getBySlug(slug),
    // NOTE: adds sorting, update when core issue is resolved
    // https://github.com/ApollosProject/apollos-prototype/issues/1091
    contentChannels: async (
      root,
      args,
      { dataSources: { ContentChannel, Person, Auth } }
    ) => {
      let channels = await ContentChannel.getRootChannels();
      const { id: personId } = await Auth.getCurrentPerson();
      const isStaff = await Person.isStaff(personId);
      if (!isStaff) channels = channels.filter(({ id }) => id !== 513);
      const sortOrder = ROCK_MAPPINGS.DISCOVER_CONTENT_CHANNEL_IDS;
      // Setup a result array.
      const result = [];
      sortOrder.forEach((configId) => {
        // Remove the matched element from the channel list.
        const index = channels.findIndex(({ id }) => id === configId);
        // if index exists, add channel to end of result array
        if (index > -1) result.push(...channels.splice(index, 1));
      });
      // Return results and any left over channels.
      return [...result, ...channels];
    },
  },
  DevotionalContentItem: {
    ...defaultResolvers,
    sharing: (root, args, { dataSources: { ContentItem } }) => ({
      url: ContentItem.getShareUrl(
        root,
        ROCK_MAPPINGS.DEVOTIONAL_SERIES_CHANNEL_ID
      ),
      title: 'Share via ...',
      message: `${root.title} - ${ContentItem.createSummary(root)}`,
    }),
    scriptures: async (
      { attributeValues: { scriptures } = {} },
      args,
      { dataSources }
    ) => dataSources.ContentItem.getContentItemScriptures(scriptures),
    series: ({ id }, args, { dataSources: { ContentItem } }) =>
      ContentItem.getParent(id, ROCK_MAPPINGS.DEVOTIONAL_SERIES_CHANNEL_ID),
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
  // SharableContentItem: {
  // url: ({ id, contentChannelId }, args, { dataSources }) =>
  // dataSources.ContentItem.getShareUrl(id, contentChannelId),
  // },
  WeekendContentItem: {
    ...defaultResolvers,
    sharing: (root, args, { dataSources: { ContentItem } }) => ({
      url: ContentItem.getShareUrl(
        root,
        ROCK_MAPPINGS.SERMON_SERIES_CHANNEL_ID
      ),
      title: 'Share via ...',
      message: `${root.title} - ${ContentItem.createSummary(root)}`,
    }),
    // deprecated
    communicator: async (
      { attributeValues: { communicators } = {} },
      args,
      { dataSources }
    ) => {
      const speakers = await dataSources.ContentItem.getCommunicators(
        communicators
      );
      return speakers[0] || null;
    },
    communicators: (
      { attributeValues: { communicators } = {} },
      args,
      { dataSources }
    ) => dataSources.ContentItem.getCommunicators(communicators),
    guestCommunicators: (
      { attributeValues: { communicators } = {} },
      args,
      { dataSources }
    ) => dataSources.ContentItem.getGuestCommunicators(communicators),
    sermonDate: ({ attributeValues: { actualDate: { value } = {} } = {} }) =>
      value,
    series: ({ id }, args, { dataSources: { ContentItem } }) =>
      ContentItem.getParent(id, ROCK_MAPPINGS.SERMON_SERIES_CHANNEL_ID),
  },
  UniversalContentItem: {
    ...defaultResolvers,
  },
  MediaContentItem: {
    ...defaultResolvers,
  },
  ContentSeriesContentItem: {
    ...defaultResolvers,
  },
};

export default resolverMerge(resolver, originalContentItem);
