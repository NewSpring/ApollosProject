import gql from 'graphql-tag';

export default gql`
  mutation deletePrayer($parsedId: String!) {
    deletePublicPrayerRequest(id: $parsedId) {
      id
      }
    }
  }
`;
