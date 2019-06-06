import gql from 'graphql-tag';

export default gql`
  query UserPrayers {
    userPrayers {
      id
      firstName
      lastName
      text
      enteredDateTime
    }
  }
`;
