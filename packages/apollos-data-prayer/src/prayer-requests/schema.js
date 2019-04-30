import gql from 'graphql-tag';

const prayerRequestSchema = gql`
  extend type Query {
    getPublicPrayerRequests: [PrayerRequest]
    getPublicPrayerRequestsByCampus(campusId: Int!): [PrayerRequest]
    getCurrentPersonPrayerRequests: [PrayerRequest] @cacheControl(maxAge: 0)
    getPrayerRequestsByGroups: [PrayerRequest]
    savedPrayers(first: Int, after: String): PrayerRequest
      @cacheControl(maxAge: 0)
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
    savePrayer(input: LikeEntityInput!): PrayerRequest
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
    isLiked: Boolean @cacheControl(maxAge: 0)
  }
`;

export default prayerRequestSchema;
