import gql from 'graphql-tag';

export default gql`
  query getGroupPrayerRequests {
    getPrayerRequestsByGroups {
      id
      firstName
      lastName
      isAnonymous
      text
      flagCount
    }
  }
`;
