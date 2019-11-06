import gql from 'graphql-tag';

export default gql`
  mutation UnSavePrayer($nodeId: String!) {
    unSavePrayer(nodeId: $nodeId) {
      id
      isAnonymous
      text
      requestor {
        firstName
        lastName
        photo {
          uri
        }
      }
      flagCount
      campus {
        id
        name
      }
      startTime
    }
  }
`;
