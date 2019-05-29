import gql from 'graphql-tag';
import CampusParts from 'newspringchurchapp/src/user-settings/Locations/campusFragment';

export default gql`
  query getCurrentUserProfile {
    currentUser {
      id
      profile {
        id
        impersonationParameter
        firstName
        lastName
        campus {
          ...CampusParts
        }
        email
        nickName
        gender
        birthDate
        photo {
          uri
        }
      }
    }
  }
  ${CampusParts}
`;
