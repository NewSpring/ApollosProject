import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import SplashScreen from 'react-native-splash-screen';

import { authLink } from '@apollosproject/ui-auth';
import { resolvers, schema, defaults } from '../store';
import { bugsnagLink } from '../bugsnag';
import httpLink from './httpLink';
import cache, { ensureCacheHydration, MARK_CACHE_LOADED } from './cache';

const link = ApolloLink.from([authLink, httpLink]);

export const client = new ApolloClient({
  link,
  cache,
  queryDeduplication: false,
  shouldBatch: true,
  resolvers,
  typeDefs: schema,
});

cache.writeData({ data: defaults });
// Ensure that media player still works after logout.
client.onResetStore(() => cache.writeData({ data: defaults }));

class ClientProvider extends PureComponent {
  static propTypes = {
    client: PropTypes.shape({
      cache: PropTypes.shape({}),
    }),
  };

  static defaultProps = {
    client,
  };

  async componentDidMount() {
    try {
      await ensureCacheHydration;
    } catch (e) {
      throw e;
    } finally {
      if (SplashScreen && SplashScreen.hide) SplashScreen.hide();
      client.mutate({ mutation: MARK_CACHE_LOADED });
    }
  }

  render() {
    return <ApolloProvider {...this.props} client={client} />;
  }
}

export default ClientProvider;
