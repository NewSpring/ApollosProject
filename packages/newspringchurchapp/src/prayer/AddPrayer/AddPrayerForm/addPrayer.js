import gql from 'graphql-tag';

export default gql`
  mutation {
    addPublicPrayerRequest(
      CampusId: $campusID
      CategoryId: $categoryID
      Text: $text
      FirstName: $firstName
      LastName: $lastName
      IsAnonymous: $isAnonymous
    ) {
      text
    }
  }
`;
