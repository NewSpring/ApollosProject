import gql from 'graphql-tag';

export default gql`
  query getUserPrayers {
    getCurrentPersonPrayerRequests {
      id
      firstName
      lastName
      text
      enteredDateTime
    }
  }
`;
