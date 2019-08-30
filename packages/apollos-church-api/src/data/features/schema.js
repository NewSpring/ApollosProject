import gql from 'graphql-tag';

export default gql`
  type NoteFeature implements Feature & Node {
    id: ID!
    order: Int

    placeholder: String
  }

  type HeaderFeature implements Feature & Node {
    id: ID!
    order: Int

    body: String
    sharing: SharableFeature
  }
`;
