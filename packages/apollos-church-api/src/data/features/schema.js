import gql from 'graphql-tag';

export default gql`
  type NoteFeature implements Feature & Node {
    id: ID!
    order: Number

    placeholder: String
  }

  type HeaderFeature implements Feature & Node {
    id: ID!
    order: Number

    body: String
    sharing: SharableFeature
  }
`;
