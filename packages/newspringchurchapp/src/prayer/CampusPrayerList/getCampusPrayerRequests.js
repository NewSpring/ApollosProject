import gql from 'graphql-tag';

export default gql`
  query getCampusPrayerRequests($campusId: Int!) {
    getPublicPrayerRequestsByCampus(campusId: $campusId) {
      id
      firstName
      lastName
      isAnonymous
      text
      flagCount
    }
  }
`;
