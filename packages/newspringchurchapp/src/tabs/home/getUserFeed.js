import gql from 'graphql-tag';

import { contentItemFragment } from 'newspringchurchapp/src/content-single/getContentItem';
import { largeCardFragment } from 'newspringchurchapp/src/ui/ContentCardConnected';

export default gql`
  query getUserFeed {
    userFeed {
      edges {
        node {
          ...largeCardFragment
          ...contentItemFragment
        }
      }
    }
  }
  ${contentItemFragment}
  ${largeCardFragment}
`;
