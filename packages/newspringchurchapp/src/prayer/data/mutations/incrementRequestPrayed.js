import gql from 'graphql-tag';

export default gql`
  mutation incrementRequestPrayed($parsedId: String!) {
    incrementPrayed(id: $parsedId) {
      id
    }
  }
`;
