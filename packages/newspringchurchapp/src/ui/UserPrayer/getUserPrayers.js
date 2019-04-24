import gql from 'graphql-tag';

export default gql`
  query userPrayerList {
    getCurrentPersonPrayerRequests {
      id
      firstName
      lastName
      text
      enteredDateTime
    }
  }
`;
