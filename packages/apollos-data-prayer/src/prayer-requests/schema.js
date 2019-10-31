import gql from 'graphql-tag';

const prayerRequestSchema = gql`
  extend type Query {
    prayers(type: PRAYER_TYPE): [PrayerRequest]
    campusPrayers: [PrayerRequest]
    userPrayers: [PrayerRequest]
    groupPrayers: [PrayerRequest]
    savedPrayers: [PrayerRequest]
  }
  extend type Mutation {
    addPrayer(
      campusId: String @deprecated(reason: "Not used")
      categoryId: Int @deprecated(reason: "Not used")
      text: String!
      firstName: String @deprecated(reason: "Not used")
      lastName: String @deprecated(reason: "Not used")
      isAnonymous: Boolean
    ): PrayerRequest
    deletePrayer(nodeId: String!): PrayerRequest
    incrementPrayerCount(nodeId: String!): PrayerRequest
    flagPrayer(nodeId: String!): PrayerRequest
    savePrayer(nodeId: String!): PrayerRequest
    unSavePrayer(nodeId: String!): PrayerRequest
  }

  enum PRAYER_TYPE {
    CAMPUS
    USER
    GROUP
    SAVED
  }

  type PrayerRequest implements Node {
    id: ID!
    firstName: String @deprecated(reason: "Not used")
    lastName: String @deprecated(reason: "Not used")
    text: String!
    enteredDateTime: String! @deprecated(reason: "Use startTime")
    startTime: String!
    flagCount: Int
    prayerCount: Int
    categoryId: Int @deprecated(reason: "Not used")
    campus: Campus
    createdByPersonAliasId: Int @deprecated(reason: "Not used")
    requestedByPersonAliasId: Int @deprecated(reason: "Not used")
    person: Person @deprecated(reason: "Use requestor")
    requestor: Person
    isAnonymous: Boolean
    isSaved: Boolean
  }
`;

export default prayerRequestSchema;
