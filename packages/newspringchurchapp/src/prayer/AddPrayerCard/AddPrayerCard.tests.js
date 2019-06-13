import React from 'react';
import { ApolloProvider } from 'react-apollo-hooks';
import GET_USER_PROFILE from 'newspringchurchapp/src/tabs/connect/getUserProfile';
import { cleanup, render } from '@testing-library/react';
import mockApolloClient from '../test.utils';
import AddPrayerCard from '.';

const mocks = [
  {
    request: {
      query: GET_USER_PROFILE,
    },
    result: {
      data: {
        currentUser: { profile: { photo: { uri: 'fakeURL' } } },
      },
    },
  },
];

const client = mockApolloClient(mocks);

describe('The AddPrayerCard component', () => {
  afterEach(cleanup);
  it('should render', async () => {
    const { baseElement } = render(
      <ApolloProvider client={client}>
        <AddPrayerCard />
      </ApolloProvider>
    );

    expect(baseElement).toBeTruthy();
  });
  it('should render a custom avatar', async () => {
    const { baseElement } = render(
      <ApolloProvider client={client}>
        <AddPrayerCard
          avatarSource={{ uri: 'https://picsum.photos/55/55?random' }}
        />
      </ApolloProvider>
    );

    expect(baseElement).toBeTruthy();
  });
  it('should render a custom title', async () => {
    const { baseElement } = render(
      <ApolloProvider client={client}>
        <AddPrayerCard
          description={'this is a custom description for the card.'}
        />
      </ApolloProvider>
    );

    expect(baseElement).toBeTruthy();
  });
});
