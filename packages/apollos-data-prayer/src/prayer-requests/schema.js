import gql from 'graphql-tag';

const prayerRequestSchema = gql`
  extend type Query {
    getPublicPrayerRequests: [PrayerRequest]
    getPublicPrayerRequestsByCampus(campusId: Int!): [PrayerRequest]
    getCurrentPersonPrayerRequests: [PrayerRequest]
    getPrayerRequestsByGroups: [PrayerRequest]
  }
  extend type Mutation {
    addPublicPrayerRequest(
      IsPublic: Boolean!
      CampusId: Int!
      CategoryId: Int!
      Text: String!
      FirstName: String!
      LastName: String
      IsAnonymous: String
    ): PrayerRequest
    incrementPrayed(id: String!): PrayerRequest
    flagRequest(id: String!): PrayerRequest
  }
  type PrayerRequest implements Node {
    id: ID!
    firstName: String
    lastName: String
    text: String!
    enteredDateTime: String!
    isPublic: Boolean
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
