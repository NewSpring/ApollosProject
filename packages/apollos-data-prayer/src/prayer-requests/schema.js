import gql from 'graphql-tag';

const prayerRequestSchema = gql`
  extend type Query {
    getPublicPrayerRequests: [PrayerRequest] @cacheControl(maxAge: 0)
    getPublicPrayerRequestsByCampus(campusId: Int!): [PrayerRequest]
    getCurrentPersonPrayerRequests: [PrayerRequest] @cacheControl(maxAge: 0)
    getPrayerRequestsByGroups: [PrayerRequest]
  }
  extend type Mutation {
    addPublicPrayerRequest(
      CampusId: Int!
      CategoryId: Int!
      Text: String!
      FirstName: String!
      LastName: String
      IsAnonymous: String
    ): PrayerRequest
    deletePublicPrayerRequest(id: String!): PrayerRequest
    incrementPrayed(id: String!): PrayerRequest
    flagRequest(id: String!): PrayerRequest
  }
  type PrayerRequest implements Node {
    id: ID!
    firstName: String
    lastName: String
    text: String!
    enteredDateTime: String!
    flagCount: Int
    prayerCount: Int
    categoryId: Int
    campusId: Int
    createdByPersonAliasId: Int
    requestedByPersonAliasId: Int
    person: Person
    isAnonymous: Boolean
  }
`;

export default prayerRequestSchema;
