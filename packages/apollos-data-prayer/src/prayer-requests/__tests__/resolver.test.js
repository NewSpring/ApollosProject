import { graphql } from 'graphql';
import { fetch } from 'apollo-server-env';
import ApollosConfig from '@apollosproject/config';
import { createTestHelpers } from '@apollosproject/server-core/lib/testUtils';

import { peopleSchema, campusSchema } from '@apollosproject/data-schema';
import * as PrayerRequest from '../index';

import prayerRequestSchema from '../schema';
import authMock from '../../authMock';
import campusMock from '../../campusMock';
import followingsMock from '../../followingsMock';
import interactionsMock from '../../interactionsMock';

const { getSchema, getContext } = createTestHelpers({
  PrayerRequest,
  Interactions: { dataSource: interactionsMock },
  Auth: { dataSource: authMock },
  Person: { dataSource: authMock },
  Campus: { dataSource: campusMock },
  Followings: { dataSource: followingsMock },
});

ApollosConfig.loadJs({
  ROCK: {
    API_URL: 'https://apollosrock.newspring.cc/api',
    API_TOKEN: 'some-rock-token',
    IMAGE_URL: 'https://apollosrock.newspring.cc/GetImage.ashx',
    TIMEZONE: 'America/New_York',
  },
  ROCK_MAPPINGS: {
    PRAYER_GROUP_TYPE_IDS: [10, 23, 25],
    PRAYER_HELP_CONTENT_ID: 26447,
  },
  APP: {
    DEEP_LINK_HOST: 'apolloschurch',
  },
});

describe('PrayerRequest resolvers', () => {
  let schema;
  let context;
  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockRockDataSourceAPI();
    schema = getSchema([prayerRequestSchema, peopleSchema, campusSchema]);
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
          requestedByPersonAliasId
          campus {
            id
            name
          }
          categoryId
          flagCount
          prayerCount
          isAnonymous
          person {
            id
            firstName
            lastName
          }
          prayerHelpContent {
            id
            title
          }
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
          requestedByPersonAliasId: 447217,
          campusId: 16,
          categoryId: 2,
          flagCount: 0,
          prayerCount: 4,
          attributeValues: {
            isAnonymous: {
              value: 'True',
            },
          },
        },
        {
          id: 'PrayerRequest:57c465ee3cd69524d729569b338607de',
          firstName: 'Rich',
          lastName: 'Dubee',
          text: 'Help me',
          requestedByPersonAliasId: 447217,
          campusId: 16,
          categoryId: 2,
          flagCount: 0,
          prayerCount: 4,
          attributeValues: {
            isAnonymous: {
              value: 'True',
            },
          },
        },
      ])
    );

    context.dataSources.PrayerRequest.get = responseMock;
    context.dataSources.Person.getFromAliasId = jest.fn(() =>
      Promise.resolve({
        id: 1,
        firstName: 'Isaac',
        lastName: 'Hardy',
      })
    );

    const rootValue = {};
    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
    expect(responseMock.mock.calls).toMatchSnapshot();
  });

  it('gets all public prayer requests by campus', async () => {
    const query = `
      query {
        getPublicPrayerRequestsByCampus(campusId: "Campus:4f68015ba18662a7409d1219a4ce013e") {
          id
          firstName
          lastName
          text
          requestedByPersonAliasId
          campus {
            id
            name
          }
          categoryId
          flagCount
          prayerCount
          isAnonymous
          person {
            id
            firstName
            lastName
          }
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
          requestedByPersonAliasId: 447217,
          campusId: 16,
          categoryId: 2,
          flagCount: 0,
          prayerCount: 4,
          attributeValues: {
            isAnonymous: {
              value: 'True',
            },
          },
        },
      ])
    );
    context.dataSources.PrayerRequest.get = responseMock;
    context.dataSources.Person.getFromAliasId = jest.fn(() =>
      Promise.resolve({
        id: 1,
        firstName: 'Isaac',
        lastName: 'Hardy',
      })
    );

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
            requestedByPersonAliasId
            campus {
              id
              name
            }
            categoryId
            flagCount
            prayerCount
            isAnonymous
            person {
              id
              firstName
              lastName
            }
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
        requestedByPersonAliasId: 447217,
        campusId: 16,
        categoryId: 2,
        flagCount: 0,
        prayerCount: 4,
        attributeValues: {
          isAnonymous: {
            value: 'True',
          },
        },
      })
    );
    context.dataSources.PrayerRequest.get = responseMock;
    context.dataSources.Person.getFromAliasId = jest.fn(() =>
      Promise.resolve({
        id: 1,
        firstName: 'Isaac',
        lastName: 'Hardy',
      })
    );

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
          requestedByPersonAliasId
          campus {
            id
            name
          }
          categoryId
          flagCount
          prayerCount
          isAnonymous
          person {
            id
            firstName
            lastName
          }
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
          requestedByPersonAliasId: 447217,
          campusId: 16,
          categoryId: 2,
          flagCount: 0,
          prayerCount: 4,
          attributeValues: {
            isAnonymous: {
              value: 'True',
            },
          },
        },
      ])
    );
    context.dataSources.PrayerRequest.get = responseMock;
    context.dataSources.Person.getFromAliasId = jest.fn(() =>
      Promise.resolve({
        id: 1,
        firstName: 'Isaac',
        lastName: 'Hardy',
      })
    );

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
          campus {
            id
            name
          }
          categoryId
          flagCount
          prayerCount
          isAnonymous
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
          attributeValues: {
            isAnonymous: {
              value: 'True',
            },
          },
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
        addPublicPrayerRequest(FirstName: "Test", LastName: "Bro", Text: "Jesus Rocks", CampusId: "Campus:4f68015ba18662a7409d1219a4ce013e", CategoryId: 1, IsAnonymous: true) {
          id
          firstName
          lastName
          text
          requestedByPersonAliasId
          campus {
            id
            name
          }
          categoryId
          flagCount
          prayerCount
          isAnonymous
          person {
            id
            firstName
            lastName
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
        requestedByPersonAliasId: 447217,
        campusId: 16,
        categoryId: 2,
        flagCount: 0,
        prayerCount: 4,
        attributeValues: {
          isAnonymous: {
            value: 'True',
          },
        },
      })
    );
    context.dataSources.PrayerRequest.post = responseMock;
    context.dataSources.PrayerRequest.get = responseMock;
    context.dataSources.Person.getFromAliasId = jest.fn(() =>
      Promise.resolve({
        id: 1,
        firstName: 'Isaac',
        lastName: 'Hardy',
      })
    );

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
          requestedByPersonAliasId
          campus {
            id
            name
          }
          categoryId
          flagCount
          prayerCount
          isAnonymous
          person {
            id
            firstName
            lastName
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
        requestedByPersonAliasId: 447217,
        campusId: 16,
        categoryId: 2,
        flagCount: 0,
        prayerCount: 4,
        attributeValues: {
          isAnonymous: {
            value: 'True',
          },
        },
      })
    );
    context.dataSources.PrayerRequest.put = responseMock;
    context.dataSources.PrayerRequest.get = responseMock;
    context.dataSources.Person.getFromAliasId = jest.fn(() =>
      Promise.resolve({
        id: 1,
        firstName: 'Isaac',
        lastName: 'Hardy',
      })
    );
    context.dataSources.Interactions.post = responseMock;

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
          requestedByPersonAliasId
          campus {
            id
            name
          }
          categoryId
          flagCount
          prayerCount
          isAnonymous
          person {
            id
            firstName
            lastName
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
        requestedByPersonAliasId: 447217,
        campusId: 16,
        categoryId: 2,
        flagCount: 0,
        prayerCount: 1,
        attributeValues: {
          isAnonymous: {
            value: 'True',
          },
        },
      })
    );
    context.dataSources.PrayerRequest.put = responseMock;
    context.dataSources.PrayerRequest.get = responseMock;
    context.dataSources.Person.getFromAliasId = jest.fn(() =>
      Promise.resolve({
        id: 1,
        firstName: 'Isaac',
        lastName: 'Hardy',
      })
    );

    const rootValue = {};
    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
  });

  it('save a prayer request', async () => {
    const query = `
      mutation {
        savePrayer(nodeId: "PrayerRequest:b36e55d803443431e96bb4b5068147ec") {
          id
          firstName
          lastName
          text
          requestedByPersonAliasId
          campus {
            id
            name
          }
          categoryId
          flagCount
          prayerCount
          isAnonymous
          person {
            id
            firstName
            lastName
          }
        }
      }
    `;

    context.dataSources.Person.getFromAliasId = jest.fn(() =>
      Promise.resolve({
        id: 1,
        firstName: 'Isaac',
        lastName: 'Hardy',
      })
    );

    const rootValue = {};
    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
  });

  it('unsave a prayer request', async () => {
    const query = `
      mutation {
        unSavePrayer(nodeId: "PrayerRequest:b36e55d803443431e96bb4b5068147ec") {
          id
          firstName
          lastName
          text
          requestedByPersonAliasId
          campus {
            id
            name
          }
          categoryId
          flagCount
          prayerCount
          isAnonymous
          person {
            id
            firstName
            lastName
          }
        }
      }
    `;

    context.dataSources.Person.getFromAliasId = jest.fn(() =>
      Promise.resolve({
        id: 1,
        firstName: 'Isaac',
        lastName: 'Hardy',
      })
    );

    const rootValue = {};
    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
  });

  it('gets all saved prayer requests', async () => {
    const query = `
      query {
        savedPrayers {
          id
          firstName
          lastName
          text
          requestedByPersonAliasId
          campus {
            id
            name
          }
          categoryId
          flagCount
          prayerCount
          isAnonymous
          person {
            id
            firstName
            lastName
          }
        }
      }
    `;

    const responseMock = jest.fn(() => ({
      get: () =>
        Promise.resolve([
          { entityId: 1 },
          { entityId: 2 },
          { entityId: 3 },
          { entityId: 4 },
          { entityId: 5 },
        ]),
    }));
    context.dataSources.Followings.getFollowingsForCurrentUser = responseMock;
    context.dataSources.PrayerRequest.getFromIds = jest.fn(() => ({
      get: () => [
        {
          id: 'PrayerRequest:b36e55d803443431e96bb4b5068147ec',
          firstName: 'Isaac',
          lastName: 'Hardy',
          text: 'Pray this works.',
          requestedByPersonAliasId: 447217,
          campusId: 16,
          categoryId: 2,
          flagCount: 0,
          prayerCount: 4,
          attributeValues: {
            isAnonymous: {
              value: 'True',
            },
          },
        },
        {
          id: 'PrayerRequest:57c465ee3cd69524d729569b338607de',
          firstName: 'Rich',
          lastName: 'Dubee',
          text: 'Help me',
          requestedByPersonAliasId: 447217,
          campusId: 16,
          categoryId: 2,
          flagCount: 0,
          prayerCount: 4,
          attributeValues: {
            isAnonymous: {
              value: 'True',
            },
          },
        },
      ],
    }));

    context.dataSources.Person.getFromAliasId = jest.fn(() =>
      Promise.resolve({
        id: 1,
        firstName: 'Isaac',
        lastName: 'Hardy',
      })
    );

    const rootValue = {};
    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
  });
});
