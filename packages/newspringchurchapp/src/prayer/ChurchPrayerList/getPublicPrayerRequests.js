import gql from 'graphql-tag';

export default gql`
  query getCampusPrayerRequests {
    getPublicPrayerRequests {
      id
      firstName
      lastName
      isAnonymous
      text
      flagCount
    }
  }
`;
