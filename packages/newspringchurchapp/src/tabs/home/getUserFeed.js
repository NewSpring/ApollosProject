import gql from 'graphql-tag';

import { CONTENT_ITEM_FRAGMENT } from 'newspringchurchapp/src/content-single/getContentItem';
import { LARGE_CARD_FRAGMENT } from 'newspringchurchapp/src/ui/ContentCardConnected';

export default gql`
  query getUserFeed($first: Int, $after: String) {
    userFeed(first: $first, after: $after) {
      pageInfo {
        endCursor
      }
      edges {
        node {
          ...largeCardFragment
          ...contentItemFragment
        }
      }
    }
  }
  ${CONTENT_ITEM_FRAGMENT}
  ${LARGE_CARD_FRAGMENT}
`;
