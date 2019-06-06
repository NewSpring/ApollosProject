import gql from 'graphql-tag';

export default gql`
  query Prayers {
    prayers {
      id
      firstName
      lastName
      isAnonymous
      text
      person {
        photo {
          uri
        }
      }
      flagCount
      campus {
        id
        name
      }
      enteredDateTime
    }
  }
`;
