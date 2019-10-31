import gql from 'graphql-tag';

export default gql`
  query Prayers {
    prayers {
      id
      flagCount
      campus {
        id
        name
      }
      startTime
      requestor {
        photo {
          uri
        }
        firstName
        nickName
        lastName
      }
    }
  }
`;
