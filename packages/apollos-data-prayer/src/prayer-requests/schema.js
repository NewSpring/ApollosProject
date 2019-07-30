import gql from 'graphql-tag';

const prayerRequestSchema = gql`
  extend type Query {
    prayers: [PrayerRequest]
    campusPrayers(campusId: String!): [PrayerRequest]
    userPrayers: [PrayerRequest] @cacheControl(maxAge: 0)
    groupPrayers: [PrayerRequest]
    savedPrayers: [PrayerRequest]
  }
  extend type Mutation {
    addPrayer(
      campusId: String
      categoryId: Int
      text: String!
      firstName: String!
      lastName: String
      isAnonymous: Boolean
    ): PrayerRequest
    deletePrayer(nodeId: String!): PrayerRequest
    incrementPrayerCount(nodeId: String!): PrayerRequest
    flagPrayer(nodeId: String!): PrayerRequest
    savePrayer(nodeId: String!): PrayerRequest
    unSavePrayer(nodeId: String!): PrayerRequest
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
    campus: Campus
    createdByPersonAliasId: Int
    requestedByPersonAliasId: Int
    person: Person
    isAnonymous: Boolean
    isSaved: Boolean
  }
`;

export default prayerRequestSchema;
