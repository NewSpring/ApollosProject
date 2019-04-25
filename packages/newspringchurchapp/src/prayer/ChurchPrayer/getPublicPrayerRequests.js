import gql from 'graphql-tag';

export default gql`
  query {
    getPublicPrayerRequests {
      id
      firstName
      lastName
      isAnonymous
      text
    }
  }
`;
