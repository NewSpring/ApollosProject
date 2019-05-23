import { fetch } from 'apollo-server-env';
import ApollosConfig from '@apollosproject/config';
import { createGlobalId } from '@apollosproject/server-core';
import { dataSource as Interactions } from '../index';

ApollosConfig.loadJs({
  ROCK: {
    API_URL: 'https://rock.newspring.cc/api',
    API_TOKEN: 'some-rock-token',
    IMAGE_URL: 'https://rock.newspring.cc/GetImage.ashx',
  },
  APP: {
    DEEP_LINK_HOST: 'newspringhchurchapp',
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

const ds = new Interactions();

const context = {
  dataSources: {
    RockConstants: {
      prayerModelType: buildGetMock({ Id: 123 }, ds),
      prayerRequestInteractionComponent: buildGetMock({ Id: 789 }, ds),
    },
    Auth: {
      getCurrentPerson: buildGetMock({ Id: 456, PrimaryAliasId: 456 }, ds),
    },
  },
};

describe('Interactions', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('creates a new interaction', async () => {
    const dataSource = new Interactions();
    dataSource.initialize({ context });
    dataSource.get = buildGetMock({ Id: 1 }, ds);
    dataSource.post = buildGetMock('1', ds);

    const result = await dataSource.createPrayerRequestInteraction({
      prayerId: createGlobalId(1, 'PrayerRequest'),
      operationName: 'Pray',
      prayerTitle: 'Super Cool Prayer',
    });
    delete dataSource.post.mock.calls[0][1].InteractionDateTime;
    expect(result).toMatchSnapshot();
    expect(dataSource.get.mock.calls).toMatchSnapshot();
    expect(dataSource.post.mock.calls).toMatchSnapshot();
  });
});
