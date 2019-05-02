import gql from 'graphql-tag';

export default gql`
  query savedPrayerList {
    savedPrayers {
      id
      campus {
        id
        name
      }
      firstName
      lastName
      text
      enteredDateTime
      person {
        photo {
          uri
        }
      }
    }
  }
`;
