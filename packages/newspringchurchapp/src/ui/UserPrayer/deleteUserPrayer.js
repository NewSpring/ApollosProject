import gql from 'graphql-tag';

export default gql`
  mutation deleteUserPrayer($parsedId: String!) {
    deletePublicPrayerRequest(id: $parsedId) {
      id
    }
  }
`;
