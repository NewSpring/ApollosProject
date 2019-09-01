import URL from 'url';
import querystring from 'querystring';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { Linking } from 'react-native';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';

const GET_CONTENT_ITEM_BY_SLUG = gql`
  query ContentItemIdFromSlug($slug: String!) {
    contentItemFromSlug(slug: $slug) {
      id
    }
  }
`;

class ExternalLinkProvider extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
    navigate: PropTypes.func.isRequired,
    client: PropTypes.shape({
      query: PropTypes.func,
      addResolvers: PropTypes.func,
      readData: PropTypes.func,
      onResetStore: PropTypes.func,
    }).isRequired,
  };

  static navigationOptions = {};

  componentDidMount() {
    console.log('within componentDidMount');
    Linking.addEventListener('url', this._handleOpenURL);
    Linking.getInitialURL().then((url) => {
      if (url) {
        this._handleOpenURL({ url });
      }
    });
  }

  componentWillUnmount() {
    Linking.removeEventListener('url');
  }

  navigate = (rawUrl) => {
    if (!rawUrl) return;
    const url = URL.parse(rawUrl);
    const route = url.pathname.substring(1);
    const args = querystring.parse(url.query);
    this.props.navigate(route, args);
  };

  _handleOpenURL = async (rawUrl) => {
    const urlArray = rawUrl.url.split(/[\s/]+/);
    const urlSlug = urlArray[urlArray.length - 1];
    const slugQuery = async () => {
      const res = await this.props.client
        .query({
          query: GET_CONTENT_ITEM_BY_SLUG,
          variables: { slug: urlSlug },
          fetchPolicy: 'network-only',
        })
        .then((result) => {
          const queryResult = result;
          return queryResult;
        });
      const { data, loading } = res;

      if (loading) return null;

      return data;
    };
    const queryResult = await slugQuery();
    const newUrl = `newspringchurchapp://AppStackNavigator/ContentSingle?itemId=${
      queryResult.contentItemFromSlug.id
    }`;
    if (newUrl) {
      this.navigate(newUrl);
    }
  };

  render() {
    return this.props.children;
  }
}

export default withApollo(ExternalLinkProvider);
