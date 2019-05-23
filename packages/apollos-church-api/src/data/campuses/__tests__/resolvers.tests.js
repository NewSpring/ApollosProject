import { graphql } from 'graphql';
import { createTestHelpers } from '@apollosproject/server-core/lib/testUtils';
import { campusSchema, peopleSchema } from '@apollosproject/data-schema';
import * as Campus from '../index';

const { getSchema, getContext } = createTestHelpers({ Campus });

describe('Campus', () => {
  const context = getContext();
  const schema = getSchema([campusSchema, peopleSchema]);
  it('gets campuses', async () => {
    const query = `
      query {
        campuses {
          image {
            uri
          }
        }
      }
    `;
    const result = await graphql(schema, query, {}, context);
    expect(result).toMatchSnapshot();
  });
});
