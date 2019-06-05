import gql from 'graphql-tag';

export default gql`
  query getPrayerRequestById($prayerId: String!) {
    getPrayerRequestById(prayerId: $prayerId) {
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
