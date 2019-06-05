import gql from 'graphql-tag';

export default gql`
  query CampusPrayers($campusId: String!) {
    campusPrayers(campusId: $campusId) {
      id
      firstName
      lastName
      isAnonymous
      person {
        photo {
          uri
        }
      }
      text
      flagCount
      campus {
        id
        name
      }
    }
  }
`;
