import gql from 'graphql-tag';

export default gql`
  mutation AddPrayer(
    $campusId: String!
    $categoryId: Int!
    $text: String!
    $firstName: String!
    $lastName: String
    $isAnonymous: Boolean
  ) {
    addPrayer(
      campusId: $campusId
      categoryId: $categoryId
      text: $text
      firstName: $firstName
      lastName: $lastName
      isAnonymous: $isAnonymous
    ) {
      id
      campus {
        id
      }
      categoryId
      text
      enteredDateTime
      firstName
      lastName
      isAnonymous
    }
  }
`;
