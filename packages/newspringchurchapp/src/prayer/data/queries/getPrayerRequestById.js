import gql from 'graphql-tag';

export default gql`
  query getPrayerRequestById($parsedId: String!) {
    getPrayerRequestById(id: $parsedId) {
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
