import { ContentItem } from '@apollosproject/data-connector-rock';
import { schemaMerge } from '@apollosproject/server-core';

const resolver = {
  NewSpringContentItem: {
    ...ContentItem.resolver.ContentItem,
  },
};

export default schemaMerge(resolver, ContentItem);
