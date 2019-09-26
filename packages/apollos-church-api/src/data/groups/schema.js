import gql from 'graphql-tag';

const schema = gql`
  extend enum GROUP_TYPE {
    Fuse
    Rally
  }
`;

export default schema;
