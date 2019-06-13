import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { MockLink } from 'apollo-link-mock';

const mockApolloClient = (mocks) =>
  new ApolloClient({
    cache: new InMemoryCache(),
    link: new MockLink(mocks),
  });

export default mockApolloClient;
