import gql from 'graphql-tag';

export default gql`
  mutation DeletePrayer($parsedId: String!) {
    deletePublicPrayerRequest
  }
`;
