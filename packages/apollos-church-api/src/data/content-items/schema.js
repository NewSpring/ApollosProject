import gql from 'graphql-tag';

const linkSchema = gql`
  extend type Query {
    externalLink(slug: String!): ContentItem
  }
`;

export default linkSchema;
