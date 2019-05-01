import gql from 'graphql-tag';

const prayerRequestSchema = gql`
  extend type Query {
    getPublicPrayerRequests: [PrayerRequest]
    getPublicPrayerRequestsByCampus(campusId: String!): [PrayerRequest]
    getCurrentPersonPrayerRequests: [PrayerRequest] @cacheControl(maxAge: 0)
    getPrayerRequestsByGroups: [PrayerRequest]
    savedPrayers(first: Int, after: String): PrayerRequestsLiked
      @cacheControl(maxAge: 0)
  }
  extend type Mutation {
    addPublicPrayerRequest(
      CampusId: String!
      CategoryId: Int!
      Text: String!
      FirstName: String!
      LastName: String
      IsAnonymous: Boolean
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
    campus: Campus
    createdByPersonAliasId: Int
    requestedByPersonAliasId: Int
    person: Person
    isAnonymous: Boolean
    isLiked: Boolean @cacheControl(maxAge: 0)
  }
  type PrayerRequestsLiked {
    edges: [PrayerRequestsLikedEdge]
    # TODO totalCount: Int
    pageInfo: PaginationInfo
  }

  type PrayerRequestsLikedEdge {
    node: PrayerRequest
    cursor: String
  }
`;

export default prayerRequestSchema;
