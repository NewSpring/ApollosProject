import gql from 'graphql-tag';

export default gql`
  query GroupPrayers {
    groupPrayers {
      id
      firstName
      lastName
      person {
        photo {
          uri
        }
      }
      isAnonymous
      text
      flagCount
      campus {
        id
        name
      }
      enteredDateTime
      startTime
      requestor {
        photo {
          uri
        }
        firstName
        nickName
        lastName
      }
    }
  }
`;
