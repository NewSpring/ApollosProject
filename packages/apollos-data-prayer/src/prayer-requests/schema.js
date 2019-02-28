import gql from 'graphql-tag';

const prayerRequestSchema = gql`
  extend type Query {
    getPrayerRequests: [PrayerRequest]
  }
  type PrayerRequest implements Node {
    id: ID!
    text: String
  }
`;

export default prayerRequestSchema;
