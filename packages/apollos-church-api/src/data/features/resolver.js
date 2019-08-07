import { Features as baseFeatures } from '@apollosproject/data-connector-rock';
import { resolverMerge } from '@apollosproject/server-core';

const resolver = {
  HeaderFeature: {
    sharing: ({ body }) => ({
      title: 'Share via...',
      message: body,
    }),
  },
};

export default resolverMerge(resolver, baseFeatures);
