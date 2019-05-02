import gql from 'graphql-tag';

export default gql`
  query savedPrayers {
    savedPrayers {
      id
      campus {
        id
        name
      }
      firstName
      lastName
      text
      enteredDateTime
      person {
        photo {
          uri
        }
      }
      isAnonymous
    }
  }
`;
