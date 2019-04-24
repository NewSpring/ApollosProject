import { Campus as originalCampus } from '@apollosproject/data-connector-rock';
import { schemaMerge } from '@apollosproject/server-core';
import { createAssetUrl } from '../utils';

const resolver = {
  Campus: {
    image: ({ location }) => ({
      uri: createAssetUrl(location.image),
      width: location.image.width,
      height: location.image.height,
    }),
  },
};

export default schemaMerge(resolver, originalCampus);
