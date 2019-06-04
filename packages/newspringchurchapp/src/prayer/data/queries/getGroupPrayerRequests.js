import gql from 'graphql-tag';

export default gql`
  query getGroupPrayerRequests {
    getPrayerRequestsByGroups {
      id
      firstName
      lastName
      person {
        photo {
          uri
        }
      }
      isAnonymous
      text
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
