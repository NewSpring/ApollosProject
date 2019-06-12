import React from 'react';
import { renderWithApolloData } from 'newspringchurchapp/src/utils/testUtils';
import Providers from 'newspringchurchapp/src/Providers';
import GET_USER_PROFILE from 'newspringchurchapp/src/tabs/connect/getUserProfile';

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

describe('The AddPrayerCard component', () => {
  it('should render', async () => {
    const tree = await renderWithApolloData(
      <Providers mocks={mocks}>
        <AddPrayerCard />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a custom avatar', async () => {
    const tree = await renderWithApolloData(
      <Providers mocks={mocks}>
        <AddPrayerCard
          avatarSource={{ uri: 'https://picsum.photos/55/55?random' }}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a custom title', async () => {
    const tree = await renderWithApolloData(
      <Providers mocks={mocks}>
        <AddPrayerCard
          description={'this is a custom description for the card.'}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
