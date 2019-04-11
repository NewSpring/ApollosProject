import gql from 'graphql-tag';

export default gql`
  query getProfilePic {
    currentUser {
      profile {
        photo {
          uri
        }
      }
    }
  }
`;
