import { createAssetUrl } from 'apollos-church-api/src/data/utils';

const resolver = {
  Query: {
    prayerMenuCategories: (
      root,
      args,
      { dataSources: { PrayerMenuCategory } }
    ) => PrayerMenuCategory.getPrayerMenuCategories(),
  },
  PrayerMenuCategory: {
    key: ({ itemGlobalKey }) => itemGlobalKey,
    subtitle: ({
      attributeValues: {
        subtitle: { value },
      },
    }) => value,
    imageURL: ({
      attributeValues: {
        imageSquare: { value },
      },
    }) => createAssetUrl(JSON.parse(value)),
    overlayColor: ({
      attributeValues: {
        overlayColor: { value },
      },
    }) => value,
  },
};

export default resolver;
