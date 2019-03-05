import gql from 'graphql-tag';

const prayerRequestSchema = gql`
  extend type Query {
    getPublicPrayerRequests: [PrayerRequest]
    getPublicPrayerRequestsByCampus(campusId: Int!): [PrayerRequest]
    getCurrentPersonPrayerRequests: [PrayerRequest]
  }
  type PrayerRequest implements Node {
    id: ID!
    firstName: String
    lastName: String
    text: String!
    isPublic: Boolean
    flagCount: Int
    prayerCount: Int
    categoryId: Int
    campusId: Int
    createdByPersonAliasId: Int
  }
`;

export default prayerRequestSchema;
