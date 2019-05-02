import gql from 'graphql-tag';

export default gql`
  mutation unSavePrayer($nodeId: String!) {
    unSavePrayer(nodeId: $nodeId) {
      id
    }
  }
`;
