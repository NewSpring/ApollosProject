import { graphql } from 'graphql';
import { fetch } from 'apollo-server-env';
import ApollosConfig from '@apollosproject/config';
import { createTestHelpers } from '@apollosproject/server-core/lib/testUtils';

import * as PrayerRequest from '../index';

import prayerRequestSchema from '../schema';
import authMock from '../../authMock';

const { getSchema, getContext } = createTestHelpers({
  PrayerRequest,
  Auth: { dataSource: authMock },
});

ApollosConfig.loadJs({
  ROCK: {
    API_URL: 'https://beta-rock.newspring.cc/api',
    API_TOKEN: 'some-rock-token',
    IMAGE_URL: 'https://beta-rock.newspring.cc/GetImage.ashx',
  },
  ROCK_MAPPINGS: {
    PRAYER_GROUP_TYPE_IDS: [10, 23, 25],
  },
  APP: {
    DEEP_LINK_HOST: 'apolloschurch',
  },
});

describe('PrayerRequest', () => {
  let schema;
  let context;
  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockRockDataSourceAPI();
    schema = getSchema([prayerRequestSchema]);
    context = getContext();
  });

  it('gets all public prayer requests', async () => {
    const query = `
      query {
        getPublicPrayerRequests {
          id
          firstName
          lastName
          text
          createdByPersonAliasId
          campusId
          categoryId
          flagCount
          prayerCount
        }
      }
    `;
    const responseMock = jest.fn(() =>
      Promise.resolve([
        {
          id: 'PrayerRequest:b36e55d803443431e96bb4b5068147ec',
          firstName: 'Isaac',
          lastName: 'Hardy',
          text: 'Pray this works.',
          createdByPersonAliasId: 447217,
          campusId: 16,
          categoryId: 2,
          flagCount: 0,
          prayerCount: 4,
        },
        {
          id: 'PrayerRequest:57c465ee3cd69524d729569b338607de',
          firstName: 'Rich',
          lastName: 'Dubee',
          text: 'Help me',
          createdByPersonAliasId: 447217,
          campusId: 16,
          categoryId: 2,
          flagCount: 0,
          prayerCount: 4,
        },
      ])
    );

    context.dataSources.PrayerRequest.get = responseMock;

    const rootValue = {};
    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
    expect(responseMock.mock.calls).toMatchSnapshot();
  });

  it('gets all public prayer requests by campus', async () => {
    const query = `
      query {
        getPublicPrayerRequestsByCampus(campusId: 16) {
          id
          firstName
          lastName
          text
          createdByPersonAliasId
          campusId
          categoryId
          flagCount
          prayerCount
        }
      }
    `;
    const responseMock = jest.fn(() =>
      Promise.resolve([
        {
          id: 'PrayerRequest:b36e55d803443431e96bb4b5068147ec',
          firstName: 'Isaac',
          lastName: 'Hardy',
          text: 'Pray this works.',
          createdByPersonAliasId: 447217,
          campusId: 16,
          categoryId: 2,
          flagCount: 0,
          prayerCount: 4,
        },
      ])
    );
    context.dataSources.PrayerRequest.get = responseMock;

    const rootValue = {};
    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
    expect(responseMock.mock.calls).toMatchSnapshot();
  });

  it('gets prayer request by id', async () => {
    const query = `
      query {
        node (id: "PrayerRequest:b36e55d803443431e96bb4b5068147ec") {
          __typename
          ... on PrayerRequest {
            id
            firstName
            lastName
            text
            createdByPersonAliasId
            campusId
            categoryId
            flagCount
            prayerCount
          }
        }
      }
    `;
    const responseMock = jest.fn(() =>
      Promise.resolve({
        id: 'PrayerRequest:b36e55d803443431e96bb4b5068147ec',
        firstName: 'Isaac',
        lastName: 'Hardy',
        text: 'Pray this works.',
        createdByPersonAliasId: 447217,
        campusId: 16,
        categoryId: 2,
        flagCount: 0,
        prayerCount: 4,
      })
    );
    context.dataSources.PrayerRequest.get = responseMock;

    const rootValue = {};
    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
    expect(responseMock.mock.calls).toMatchSnapshot();
  });

  it('gets all prayers from current person', async () => {
    const query = `
      query {
        getCurrentPersonPrayerRequests {
          id
          firstName
          lastName
          text
          createdByPersonAliasId
          campusId
          categoryId
          flagCount
          prayerCount
        }
      }
    `;

    const responseMock = jest.fn(() =>
      Promise.resolve([
        {
          id: 'PrayerRequest:b36e55d803443431e96bb4b5068147ec',
          firstName: 'Isaac',
          lastName: 'Hardy',
          text: 'Pray this works.',
          createdByPersonAliasId: 447217,
          campusId: 16,
          categoryId: 2,
          flagCount: 0,
          prayerCount: 4,
        },
      ])
    );
    context.dataSources.PrayerRequest.get = responseMock;

    const rootValue = {};
    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
    expect(responseMock.mock.calls).toMatchSnapshot();
  });

  it('gets all prayers from groups', async () => {
    const query = `
      query {
        getPrayerRequestsByGroups {
          id
          firstName
          lastName
          text
          createdByPersonAliasId
          requestedByPersonAliasId
          campusId
          categoryId
          flagCount
          prayerCount
        }
      }
    `;

    const responseMock = jest.fn(() =>
      Promise.resolve([
        {
          id: 'PrayerRequest:b36e55d803443431e96bb4b5068147ec',
          firstName: 'Isaac',
          lastName: 'Hardy',
          text: 'Pray this works.',
          createdByPersonAliasId: 447217,
          requestedByPersonAliasId: 447217,
          campusId: 16,
          categoryId: 2,
          flagCount: 0,
          prayerCount: 4,
        },
      ])
    );
    context.dataSources.PrayerRequest.get = responseMock;

    const rootValue = {};
    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
    expect(responseMock.mock.calls).toMatchSnapshot();
  });

  it('creates a new prayer', async () => {
    const query = `
      mutation {
        addPublicPrayerRequest(IsPublic: true, FirstName: "Test", LastName: "Bro", Text: "Jesus Rocks", CampusId: 16, CategoryId: 1) {
          id
          firstName
          lastName
          text
          createdByPersonAliasId
          campusId
          categoryId
          flagCount
          prayerCount
        }
      }
    `;
    const responseMock = jest.fn(() =>
      Promise.resolve({
        id: 'PrayerRequest:b36e55d803443431e96bb4b5068147ec',
        firstName: 'Isaac',
        lastName: 'Hardy',
        text: 'Pray this works.',
        createdByPersonAliasId: 447217,
        campusId: 16,
        categoryId: 2,
        flagCount: 0,
        prayerCount: 4,
      })
    );
    context.dataSources.PrayerRequest.post = responseMock;
    context.dataSources.PrayerRequest.get = responseMock;

    const rootValue = {};
    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
  });
  it('increments prayed for a request', async () => {
    const query = `
      mutation {
        incrementPrayed(id: "PrayerRequest:b36e55d803443431e96bb4b5068147ec") {
          id
          firstName
          lastName
          text
          createdByPersonAliasId
          campusId
          categoryId
          flagCount
          prayerCount
        }
      }
    `;
    const responseMock = jest.fn(() =>
      Promise.resolve({
        id: 'PrayerRequest:b36e55d803443431e96bb4b5068147ec',
        firstName: 'Isaac',
        lastName: 'Hardy',
        text: 'Pray this works.',
        createdByPersonAliasId: 447217,
        campusId: 16,
        categoryId: 2,
        flagCount: 0,
        prayerCount: 4,
      })
    );
    context.dataSources.PrayerRequest.put = responseMock;
    context.dataSources.PrayerRequest.get = responseMock;

    const rootValue = {};
    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
  });

  it('flags a prayer request', async () => {
    const query = `
      mutation {
        flagRequest(id: "PrayerRequest:b36e55d803443431e96bb4b5068147ec") {
          id
          firstName
          lastName
          text
          createdByPersonAliasId
          campusId
          categoryId
          flagCount
          prayerCount
        }
      }
    `;
    const responseMock = jest.fn(() =>
      Promise.resolve({
        id: 'PrayerRequest:b36e55d803443431e96bb4b5068147ec',
        firstName: 'Isaac',
        lastName: 'Hardy',
        text: 'Pray this works.',
        createdByPersonAliasId: 447217,
        campusId: 16,
        categoryId: 2,
        flagCount: 0,
        prayerCount: 1,
      })
    );
    context.dataSources.PrayerRequest.put = responseMock;
    context.dataSources.PrayerRequest.get = responseMock;

    const rootValue = {};
    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
  });
});
