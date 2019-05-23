import { fetch } from 'apollo-server-env';
import ApollosConfig from '@apollosproject/config';
import { dataSource as RockConstants } from '../index';

ApollosConfig.loadJs({
  ROCK_MAPPINGS: {
    PRAYER_REQUEST_TYPE: 'PrayerRequest',
    INTERACTIONS: {
      CHANNEL_NAME: 'Apollos App',
      COMPONENT_NAME: 'Apollos Prayer Request',
      CHANNEL_MEDIUM_TYPE_ID: 512,
    },
  },
});

const buildGetMock = (response, dataSource) => {
  const get = jest.fn();
  if (Array.isArray(response) && Array.isArray(response[0])) {
    response.forEach((responseVal) => {
      get.mockReturnValueOnce(
        new Promise((resolve) => resolve(dataSource.normalize(responseVal)))
      );
    });
  }
  get.mockReturnValue(
    new Promise((resolve) => resolve(dataSource.normalize(response)))
  );
  return get;
};

describe('RockConstants', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  it("creates a Channel if it doesn't exist", async () => {
    const dataSource = new RockConstants();
    dataSource.prayerModelType = buildGetMock({ id: 101 }, dataSource);
    dataSource.get = buildGetMock([[], { id: 1 }], dataSource);
    dataSource.post = buildGetMock('1', dataSource);
    const result = await dataSource.prayerRequestInteractionChannel();
    expect(result).toMatchSnapshot();
    expect(dataSource.prayerModelType.mock.calls).toMatchSnapshot();
    expect(dataSource.get.mock.calls).toMatchSnapshot();
    expect(dataSource.post.mock.calls).toMatchSnapshot();
  });
  it('finds the Channel if it exists', async () => {
    const dataSource = new RockConstants();
    dataSource.get = buildGetMock([{ Id: 1 }], dataSource);
    dataSource.post = jest.fn();
    const result = await dataSource.prayerRequestInteractionChannel();
    expect(result).toMatchSnapshot();
    expect(dataSource.get.mock.calls).toMatchSnapshot();
    expect(dataSource.post.mock.calls.length).toBe(0);
  });
  it("creates a Component if it doesn't exist", async () => {
    const dataSource = new RockConstants();
    dataSource.prayerModelType = buildGetMock({ id: 101 }, dataSource);
    dataSource.get = buildGetMock([[], { id: 1 }], dataSource);
    dataSource.post = buildGetMock('1', dataSource);
    const result = await dataSource.prayerRequestInteractionComponent({
      prayerRequestId: 7,
      prayerName: 'Some Title',
    });
    expect(result).toMatchSnapshot();
    expect(dataSource.prayerModelType.mock.calls).toMatchSnapshot();
    expect(dataSource.get.mock.calls).toMatchSnapshot();
    expect(dataSource.post.mock.calls).toMatchSnapshot();
  });
  it('finds the Component if it exists', async () => {
    const dataSource = new RockConstants();
    dataSource.get = buildGetMock([{ Id: 1 }], dataSource);
    dataSource.post = jest.fn();
    const result = await dataSource.prayerRequestInteractionComponent({
      prayerRequestId: 7,
      prayerName: 'Some Title',
    });
    expect(result).toMatchSnapshot();
    expect(dataSource.get.mock.calls).toMatchSnapshot();
    expect(dataSource.post.mock.calls.length).toBe(0);
  });
  it('finds a Prayer Request model ID', async () => {
    const dataSource = new RockConstants();
    dataSource.get = buildGetMock([{ Id: 1 }], dataSource);
    const result = await dataSource.prayerModelType('PrayerRequest');
    expect(result).toMatchSnapshot();
    expect(dataSource.get.mock.calls).toMatchSnapshot();
  });
  it('Throws when finding an unknown model ', () => {
    const dataSource = new RockConstants();
    dataSource.get = buildGetMock([{ Id: 1 }], dataSource);
    const prom = dataSource.prayerModelType('IDontExist');
    expect(prom).rejects.toEqual(
      new Error('IDontExist has not been mapped into a Rock type!')
    );
  });
  it('Returns null if model type not found ', async () => {
    const dataSource = new RockConstants();
    dataSource.get = buildGetMock([], dataSource);
    const result = await dataSource.prayerModelType('PrayerRequest');
    expect(result).toEqual(null);
  });
});
