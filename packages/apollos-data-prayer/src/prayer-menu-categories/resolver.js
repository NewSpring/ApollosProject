import { ROCK, ROCK_MAPPINGS } from '@apollosproject/config';

const createAssetUrl = (value) => {
  if (value.path) {
    return value.path;
  }
  if (value.Key && value.AssetStorageProviderId) {
    return `${ROCK.IMAGE_URL}/${
      ROCK_MAPPINGS.ASSET_STORAGE_PROVIDERS[`${value.AssetStorageProviderId}`]
    }/${value.Key}`;
  }
  return '';
};

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
