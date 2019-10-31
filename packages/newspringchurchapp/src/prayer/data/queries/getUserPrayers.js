import gql from 'graphql-tag';

export default gql`
  query UserPrayers {
    userPrayers {
      id
      text
      enteredDateTime
      startTime
    }
  }
`;
