import gql from 'graphql-tag';

export default gql`
  mutation SavePrayer($nodeId: String!) {
    savePrayer(nodeId: $nodeId) {
      id
      isAnonymous
      text
      flagCount
      campus {
        id
        name
      }
      startTime
      requestor {
        firstName
        lastName
        photo {
          uri
        }
      }
    }
  }
`;
