import gql from 'graphql-tag';

import { largeCardFragment } from 'newspringchurchapp/src/ui/ContentCardConnected';
import { contentItemFragment } from 'newspringchurchapp/src/content-single/getContentItem';

export default gql`
  query getAllLikedContent($first: Int, $after: String) {
    likedContent(first: $first, after: $after) {
      pageInfo {
        endCursor
      }
      edges {
        node {
          ... on ContentItem {
            ...contentItemFragment
            ...largeCardFragment
          }
        }
      }
    }
  }
  ${contentItemFragment}
  ${largeCardFragment}
`;
