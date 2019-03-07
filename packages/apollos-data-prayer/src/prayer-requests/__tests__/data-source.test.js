import ApollosConfig from '@apollosproject/config';
import PrayerRequest from '../data-source';

ApollosConfig.loadJs({
  ROCK: {
    API_URL: 'https://beta-rock.newspring.cc/api',
    API_TOKEN: 'some-rock-token',
    IMAGE_URL: 'https://beta-rock.newspring.cc/GetImage.ashx',
  },
});

// Builds a mock data source for Auth
const buildDataSource = (Auth) => {
  const dataSource = new PrayerRequest();
  dataSource.context = { dataSources: { Auth } };
  return dataSource;
};

// Fake user data
const AuthMock = { getCurrentPerson: () => ({ primaryAliasId: 123 }) };

describe('PrayerRequest', () => {
  it('constructs', () => {
    expect(new PrayerRequest()).toBeTruthy();
  });

  it('gets all public prayer requests', () => {
    const dataSource = new PrayerRequest();
    dataSource.get = jest.fn(() =>
      Promise.resolve([
        {
          id: 'PrayerRequest:b36e55d803443431e96bb4b5068147ec',
          firstName: 'Isaac',
          lastName: 'Hardy',
          text: 'Pray this works.',
          createdByPersonAliasId: 447217,
        },
        {
          id: 'PrayerRequest:57c465ee3cd69524d729569b338607de',
          firstName: 'Rich',
          lastName: 'Dubee',
          text: 'Help me',
          createdByPersonAliasId: 447217,
        },
      ])
    );
    const result = dataSource.getAll();
    expect(result).resolves.toMatchSnapshot();
    expect(dataSource.get.mock.calls).toMatchSnapshot();
  });

  it('gets prayer request by id', () => {
    const dataSource = new PrayerRequest();
    dataSource.get = jest.fn(() =>
      Promise.resolve({
        id: 'PrayerRequest:b36e55d803443431e96bb4b5068147ec',
        firstName: 'Isaac',
        lastName: 'Hardy',
        text: 'Pray this works.',
        createdByPersonAliasId: 447217,
      })
    );
    // "1" is a specific prayer request id
    const result = dataSource.getFromId(1);
    expect(result).resolves.toMatchSnapshot();
    expect(dataSource.get.mock.calls).toMatchSnapshot();
  });

  it('gets all public prayer requests by campus', () => {
    const dataSource = new PrayerRequest();
    dataSource.get = jest.fn(() =>
      Promise.resolve([
        {
          id: 'PrayerRequest:b36e55d803443431e96bb4b5068147ec',
          firstName: 'Isaac',
          lastName: 'Hardy',
          text: 'Pray this works.',
          createdByPersonAliasId: 447217,
        },
      ])
    );

    // "16" is a campus id
    const result = dataSource.getAllByCampus(16);
    expect(result).resolves.toMatchSnapshot();
    expect(dataSource.get.mock.calls).toMatchSnapshot();
  });

  it('gets current persons prayer requests', () => {
    const dataSource = buildDataSource(AuthMock);
    dataSource.get = jest.fn(() =>
      Promise.resolve([
        {
          id: 'PrayerRequest:b36e55d803443431e96bb4b5068147ec',
          firstName: 'Isaac',
          lastName: 'Hardy',
          text: 'Pray this works.',
          createdByPersonAliasId: 447217,
        },
      ])
    );

    const result = dataSource.getFromCurrentPerson();
    expect(result).resolves.toMatchSnapshot();
    expect(dataSource.get.mock.calls).toMatchSnapshot();
  });

  it('creates prayer request', async () => {
    const dataSource = buildDataSource(AuthMock);

    dataSource.post = jest.fn(() =>
      Promise.resolve({
        id: 'PrayerRequest:b36e55d803443431e96bb4b5068147ec',
        firstName: 'Isaac',
        lastName: 'Hardy',
        text: 'Pray this works.',
        createdByPersonAliasId: 447217,
      })
    );

    dataSource.get = jest.fn(() =>
      Promise.resolve({
        id: 'PrayerRequest:b36e55d803443431e96bb4b5068147ec',
        firstName: 'Isaac',
        lastName: 'Hardy',
        text: 'Pray this works.',
        createdByPersonAliasId: 447217,
      })
    );

    const result = await dataSource.add({
      FirstName: 'Test',
      LastName: 'bro',
      Text: 'Pray this works.',
      CategoryId: 2,
      CampusId: 16,
      IsPublic: true,
    });
    delete dataSource.post.mock.calls[0][1].EnteredDateTime;
    expect(result).toMatchSnapshot();
    expect(dataSource.post.mock.calls).toMatchSnapshot();
  });

  it('increments prayed for a request', async () => {
    const dataSource = buildDataSource(AuthMock);

    dataSource.put = jest.fn(() =>
      Promise.resolve({
        id: 'PrayerRequest:b36e55d803443431e96bb4b5068147ec',
        firstName: 'Isaac',
        lastName: 'Hardy',
        text: 'Pray this works.',
        createdByPersonAliasId: 447217,
        prayerCount: 8,
      })
    );

    dataSource.get = jest.fn(() =>
      Promise.resolve({
        id: 'PrayerRequest:b36e55d803443431e96bb4b5068147ec',
        firstName: 'Isaac',
        lastName: 'Hardy',
        text: 'Pray this works.',
        createdByPersonAliasId: 447217,
        prayerCount: 8,
      })
    );

    const result = await dataSource.incrementPrayed(10);
    expect(result).toMatchSnapshot();
    expect(dataSource.put.mock.calls).toMatchSnapshot();
  });

  it('flags a prayer request', async () => {
    const dataSource = buildDataSource(AuthMock);

    dataSource.put = jest.fn(() =>
      Promise.resolve({
        id: 'PrayerRequest:b36e55d803443431e96bb4b5068147ec',
        firstName: 'Isaac',
        lastName: 'Hardy',
        text: 'Pray this works.',
        createdByPersonAliasId: 447217,
        prayerCount: 8,
      })
    );

    dataSource.get = jest.fn(() =>
      Promise.resolve({
        id: 'PrayerRequest:b36e55d803443431e96bb4b5068147ec',
        firstName: 'Isaac',
        lastName: 'Hardy',
        text: 'Pray this works.',
        createdByPersonAliasId: 447217,
        prayerCount: 8,
      })
    );

    const result = await dataSource.flag(10);
    expect(result).toMatchSnapshot();
    expect(dataSource.put.mock.calls).toMatchSnapshot();
  });
});
