import { graphql } from 'graphql';
import { fetch } from 'apollo-server-env';
import ApollosConfig from '@apollosproject/config';

import { createTestHelpers } from '@apollosproject/server-core/lib/testUtils';
import {
  peopleSchema,
  mediaSchema,
  authSchema,
} from '@apollosproject/data-schema';

// we import the root-level schema and resolver so we test the entire integration:
import * as Person from '../index';
import authMock from '../../authMock';

const Auth = { schema: authSchema, dataSource: authMock };
const { getContext, getSchema } = createTestHelpers({ Person, Auth });

ApollosConfig.loadJs({
  ROCK: {
    API_URL: 'https://beta-rock.newspring.cc/api',
    API_TOKEN: 'some-rock-token',
    IMAGE_URL: 'https://beta-rock.newspring.cc/GetImage.ashx',
  },
});

describe('PrayerRequest', () => {
  let schema;
  let context;
  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockRockDataSourceAPI();
    schema = getSchema([peopleSchema, mediaSchema]);
    context = getContext();
  });

  it("updates a user's attributes, if there is a current user", async () => {
    const query = `
      query {
        getPrayerRequests {
          id
          text
        }
      }
    `;

    const rootValue = {};
    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
  });
});
