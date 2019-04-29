import gql from 'graphql-tag';

export default gql`
  query getPublicPrayerRequests {
    getPublicPrayerRequests {
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
