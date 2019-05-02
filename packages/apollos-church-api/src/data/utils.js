import ApollosConfig from '@apollosproject/config';

const { ROCK, ROCK_MAPPINGS } = ApollosConfig;

export const createAssetUrl = (value) =>
  value.path
    ? value.path
    : `${ROCK.IMAGE_URL}/${
        ROCK_MAPPINGS.ASSET_STORAGE_PROVIDERS[`${value.AssetStorageProviderId}`]
      }/${value.Key}`;

export const fakeFunction = () => 'Fake';
