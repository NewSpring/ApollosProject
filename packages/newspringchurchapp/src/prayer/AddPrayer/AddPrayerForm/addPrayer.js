import gql from 'graphql-tag';

export default gql`
  mutation AddPrayer(
    $campusID: String!
    $categoryID: Int!
    $text: String!
    $firstName: String!
    $lastName: String
    $isAnonymous: Boolean
  ) {
    addPublicPrayerRequest(
      CampusId: $campusID
      CategoryId: $categoryID
      Text: $text
      FirstName: $firstName
      LastName: $lastName
      IsAnonymous: $isAnonymous
    ) {
      id
      campus {
        id
      }
      categoryId
      text
      firstName
      lastName
      isAnonymous
    }
  }
`;
