import { PropTypes } from 'prop-types';
import { useQuery } from 'react-apollo';

import GET_CONTENT_ITEM_BY_SLUG from './getIdBySlug';

const LinkParser = ({ url }) => {
  const urlSlug = url.split(/[\s/]+/);
  const appUrl = urlSlug[urlSlug.length - 1];
  const { loading, error, data } = useQuery(GET_CONTENT_ITEM_BY_SLUG, {
    variables: { appUrl },
  });
  if (loading) return loading;
  if (error) return null;

  return `newspringchurchapp://AppStackNavigator/ContentItem?itemId=${data}`;
};

LinkParser.propTypes = {
  url: PropTypes.string,
};

export default LinkParser;
