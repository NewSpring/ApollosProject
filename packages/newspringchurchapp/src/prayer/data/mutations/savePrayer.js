import gql from 'graphql-tag';

export default gql`
  mutation SavePrayer($nodeId: String!) {
    savePrayer(nodeId: $nodeId) {
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
