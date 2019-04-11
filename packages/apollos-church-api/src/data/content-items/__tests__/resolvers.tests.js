import { graphql } from 'graphql';
import { fetch } from 'apollo-server-env';

import { createGlobalId } from '@apollosproject/server-core';
import { createTestHelpers } from '@apollosproject/server-core/lib/testUtils';
import ApollosConfig from '@apollosproject/config';
import { AuthenticationError } from 'apollo-server';
import { get } from 'lodash';

import {
  mediaSchema,
  themeSchema,
  scriptureSchema,
} from '@apollosproject/data-schema';
// we import the root-level schema and resolver so we test the entire integration:
import {
  ContentChannel,
  Sharable,
  Person,
  RockConstants,
} from '@apollosproject/data-connector-rock';

import * as ContentItem from '../index';
// import { generateToken } from '../../auth/token';

class Scripture {
  // eslint-disable-next-line class-methods-use-this
  initialize() {}

  // eslint-disable-next-line class-methods-use-this
  getScriptures() {
    return [
      {
        html: `<p class="p"><span data-number="1" class="v">1</span>The Song of songs, which is Solomon’s.</p>`,
      },
    ];
  }
}
class AuthDataSource {
  initialize({ context }) {
    this.context = context;
  }

  getCurrentPerson() {
    if (this.context.currentPerson) {
      return { id: 'someId' };
    }
    throw new AuthenticationError('Must be logged in');
  }
}

const Auth = {
  dataSource: AuthDataSource,
  contextMiddleware: ({ req, context }) => {
    if (get(req, 'headers.authorization')) {
      return {
        ...context,
        currentPerson: true,
      };
    }
    return { ...context };
  },
};

const { getSchema } = createTestHelpers({
  ContentChannel,
  ContentItem,
  Sharable,
  UniversalContentItem: {
    dataSource: ContentItem.dataSource,
  }, // alias
  DevotionalContentItem: {
    dataSource: ContentItem.dataSource,
  }, // alias
  Scripture: {
    dataSource: Scripture,
  },
  RockConstants,
  Person,
  Auth,
});
// we import the root-level schema and resolver so we test the entire integration:

ApollosConfig.loadJs({
  ROCK: {
    API_URL: 'https://apollosrock.newspring.cc/api',
    API_TOKEN: 'some-rock-token',
    IMAGE_URL: 'https://apollosrock.newspring.cc/GetImage.ashx',
    TIMEZONE: 'America/New_York',
  },
  ROCK_CONSTANTS: {
    IMAGE: 10,
    AUDIO_FILE: 77,
    VIDEO_FILE: 79,
  },
  ROCK_MAPPINGS: {
    FEED_CONTENT_CHANNEL_IDS: [1, 2, 3, 4, 6, 8],
    SERIES_CONTENT_CHANNEL_TYPE_IDS: [6, 7],
  },
});

const contentItemFragment = `
  fragment ContentItemFragment on ContentItem {
    id
    __typename
    title
    summary
    coverImage {
      name
      key
      sources {
        uri
      }
    }
    images {
      __typename # Typenames here to increase test coverage
      name
      key
      sources {
        __typename
        uri
      }
    }
    videos {
      __typename
      name
      key
      sources {
        __typename
        uri
      }
      embedHtml
    }
    audios {
      __typename
      name
      key
      sources {
        __typename
        uri
      }
    }
    htmlContent
    childContentItemsConnection {
      edges {
        node {
          id
          __typename
        }
        cursor
      }
      pageInfo {
        startCursor
        endCursor
      }
    }
    parentChannel {
      id
      __typename
    }
    sharing {
      __typename
      url
      title
      message
    }
  }
`;

describe('UniversalContentItem', () => {
  let schema;
  let context;
  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockRockDataSourceAPI();
    schema = getSchema([themeSchema, mediaSchema, scriptureSchema]);
  });

  it('gets a newspring content item', async () => {
    const query = `
      query {
        node(id: "${createGlobalId(1, 'UniversalContentItem')}") {
          ...ContentItemFragment
        }
      }
      ${contentItemFragment}
    `;
    const rootValue = {};
    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
  });

  it('gets a newspring MediaContentItem item', async () => {
    const query = `
      query {
        node(id: "${createGlobalId(1, 'MediaContentItem')}") {
          ...ContentItemFragment
        }
      }
      ${contentItemFragment}
    `;
    const rootValue = {};
    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
  });

  it('gets a newspring ContentSeriesContentItem item', async () => {
    const query = `
      query {
        node(id: "${createGlobalId(1, 'ContentSeriesContentItem')}") {
          ...ContentItemFragment
        }
      }
      ${contentItemFragment}
    `;
    const rootValue = {};
    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
  });

  it('gets a newspring devotional item', async () => {
    const query = `
      query {
        node(id: "${createGlobalId(123, 'DevotionalContentItem')}") {
          id
          ... on DevotionalContentItem {
            id
            title
            scriptures {
              html
            }
          }
        }
      }
    `;
    const rootValue = {};
    const result = await graphql(schema, query, rootValue, context);
    expect(result).toMatchSnapshot();
  });
});
