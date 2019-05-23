import { Campus as originalCampus } from '@apollosproject/data-connector-rock';
import { schemaMerge } from '@apollosproject/server-core';
import { createAssetUrl } from '../utils';

const resolver = {
  Query: {
    campuses: (root, { location }, { dataSources }) =>
      dataSources.Campus.getPublicByLocation(location),
  },
  Campus: {
    latitude: ({ location }) =>
      (typeof location.latitude === 'number' && location.latitude) || 0,
    longitude: ({ location }) =>
      (typeof location.longitude === 'number' && location.longitude) || 0,
    image: ({ location }) => ({
      uri: createAssetUrl(location.image),
      width: location.image.width,
      height: location.image.height,
    }),
  },
};

export default schemaMerge(resolver, originalCampus);
