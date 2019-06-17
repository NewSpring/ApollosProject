import gql from 'graphql-tag';

export const slugSchema = gql`
  type ContentChannelItemSlug implements Node {
    id: ID!
    contentChannelItemId: ID!
    slug: String
  }
`;

export default slugSchema;
