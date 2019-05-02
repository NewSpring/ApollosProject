import gql from 'graphql-tag';

export default gql`
  mutation savePrayerRequest($nodeId: String!) {
    savePrayer(nodeId: $nodeId) {
      id
    }
  }
`;
