import { ContentItem as baseContentItem } from '@apollosproject/data-connector-rock';
import { resolverMerge } from '@apollosproject/server-core';

const resolver = {
  WeekendContentItem: {
    communicator: () => null,
    sermonDate: ({ attributeValues: { actualDate: { value } = {} } = {} }) =>
      value,
  },
};
export default resolverMerge(resolver, baseContentItem);
