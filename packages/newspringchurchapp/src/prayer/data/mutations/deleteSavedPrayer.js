import gql from 'graphql-tag';

export default gql`
  mutation deleteSavedPrayer($nodeId: String!) {
    unSavePrayer(nodeId: $nodeId) {
      id
    }
  }
`;
