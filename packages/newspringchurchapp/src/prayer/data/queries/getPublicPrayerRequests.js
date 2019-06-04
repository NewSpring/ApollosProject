import gql from 'graphql-tag';

export default gql`
  query getPublicPrayerRequests {
    getPublicPrayerRequests {
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
      prayerHelpContent {
        id
        title
      }
    }
  }
`;
