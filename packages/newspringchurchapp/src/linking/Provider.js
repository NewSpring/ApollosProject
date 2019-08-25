import URL from 'url';
import querystring from 'querystring';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { Linking, AsyncStorage } from 'react-native';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import { resolvers, defaults } from '../store';

const GET_CONTENT_ITEM_BY_SLUG = gql`
  query ContentItemIdFromSlug($slug: String!) {
    contentItemFromSlug(slug: $slug) @client {
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

  constructor(props) {
    super(props);
    const { client } = props;
    client.addResolvers(resolvers);
    client.writeData({ data: defaults });
    client.onResetStore(() => client.writeData({ data: defaults }));
  }

  componentDidMount() {
    Linking.getInitialURL().then((url) => {
      if (url) {
        this._handleOpenURL({ url });
      }
    });
    Linking.addEventListener('url', ({ url }) => this._handleOpenURL(url));
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

  _handleOpenURL = (url) => {
    const urlArray = url.split(/[\s/]+/);
    const urlSlug = urlArray[urlArray.length - 1];
    const contentItemFromSlug = () =>
      AsyncStorage.getItem('contentItemFromSlug');
    this.props.client.query({
      query: GET_CONTENT_ITEM_BY_SLUG,
      variables: { urlSlug },
      data: { contentItemFromSlug },
    });
    const newUrl = `newspringchurchapp://AppStackNavigator/ContentSingle?itemId=${contentItemFromSlug}`;
    if (newUrl) {
      this.navigate(newUrl);
    }
  };

  render() {
    return this.props.children;
  }
}

export default withApollo(ExternalLinkProvider);
