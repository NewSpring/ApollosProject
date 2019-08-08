import gql from 'graphql-tag';

const GET_CONTENT_ITEM_BY_SLUG = gql`
  query ContentItemIdFromSlug($slug: String!) {
    externalLink(slug: $slug) {
      id
    }
  }
`;

export default GET_CONTENT_ITEM_BY_SLUG;
