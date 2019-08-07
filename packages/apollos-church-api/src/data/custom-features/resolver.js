import { Features as baseFeatures } from '@apollosproject/data-connector-rock';
import { resolverMerge } from '@apollosproject/server-core';

const resolver = {
  HeaderFeature: {
    // TODO waiting on core release
    // sharing: ({ body }) => ({
    // title: 'Share via...',
    // message: body,
    // }),
  },
};

export default resolverMerge(resolver, baseFeatures);
