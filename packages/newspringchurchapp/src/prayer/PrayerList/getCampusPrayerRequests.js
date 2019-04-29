import gql from 'graphql-tag';

export default gql`
  query getCampusPrayerRequests($campusId: String!) {
    getPublicPrayerRequestsByCampus(campusId: $campusId) {
      id
      firstName
      lastName
      isAnonymous
      text
      flagCount
      campusId
    }
  }
`;
