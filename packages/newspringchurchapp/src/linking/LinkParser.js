import { PropTypes } from 'prop-types';
import client from '../client';

import GET_CONTENT_ITEM_BY_SLUG from './getIdBySlug';

const LinkParser = ({ url }) => {
  const urlArray = url.split(/[\s/]+/);
  const urlSlug = urlArray[urlArray.length - 1];
  const slugQuery = client
    .query(GET_CONTENT_ITEM_BY_SLUG, {
      variables: { urlSlug },
    })
    .then((result) => console.log(result));

  return slugQuery;
};

LinkParser.propTypes = {
  url: PropTypes.string,
};

export default LinkParser;
