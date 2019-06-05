import gql from 'graphql-tag';

export default gql`
  query GetPrayers {
    getPrayers {
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
    }
  }
`;
