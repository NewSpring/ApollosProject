import gql from 'graphql-tag';

export default gql`
  query CampusPrayers {
    campusPrayers {
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
      enteredDateTime
    }
  }
`;
