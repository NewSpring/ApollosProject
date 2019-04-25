import gql from 'graphql-tag';

export default gql`
  mutation flagPrayerRequest($parsedId: String!) {
    flagRequest(id: $parsedId) {
      id
    }
  }
`;
