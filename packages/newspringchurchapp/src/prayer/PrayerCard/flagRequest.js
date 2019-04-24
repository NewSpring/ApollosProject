import gql from 'graphql-tag';

export default gql`
  mutation flagRequest($parsedId: String!) {
    flagRequest(id: $parsedId) {
      id
    }
  }
`;
