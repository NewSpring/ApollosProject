import gql from 'graphql-tag';

export default gql`
  mutation UnSavePrayer($nodeId: String!) {
    unSavePrayer(nodeId: $nodeId) {
      id
      firstName
      lastName
      isAnonymous
      text
      person {
        photo {
          uri
        }
      }
      flagCount
      campus {
        id
        name
      }
      enteredDateTime
    }
  }
`;
