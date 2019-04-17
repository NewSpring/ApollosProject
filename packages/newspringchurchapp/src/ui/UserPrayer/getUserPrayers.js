import gql from 'graphql-tag';

export default gql`
  query {
    getCurrentPersonPrayerRequests {
      id
      firstName
      lastName
      text
      enteredDateTime
    }
  }
`;
