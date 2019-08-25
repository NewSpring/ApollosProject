import { PropTypes } from 'prop-types';

import GET_CONTENT_ITEM_BY_SLUG from './getIdBySlug';

const LinkParser = async ({ url, client }) => {
  const urlArray = url.split(/[\s/]+/);
  const urlSlug = urlArray[urlArray.length - 1];
  const { data: contentItemFromSlug = {} } = await client
    .query(GET_CONTENT_ITEM_BY_SLUG, {
      variables: { urlSlug },
    })
    .then((result) => console.log(result));

  return contentItemFromSlug.id;
};

LinkParser.propTypes = {
  url: PropTypes.string,
};

export default LinkParser;
