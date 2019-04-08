import gql from 'graphql-tag';

export default gql`
  query getMyPrayers {
    getCurrentPersonPrayerRequests {
      id
      firstName
      lastName
      text
      enteredDateTime
    }
  }
`;
