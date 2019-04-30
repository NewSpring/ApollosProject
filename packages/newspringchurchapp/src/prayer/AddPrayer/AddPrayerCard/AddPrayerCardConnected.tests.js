import React from 'react';

import Providers from 'newspringchurchapp/src/Providers';
import { renderWithApolloData } from 'newspringchurchapp/src/utils/testUtils';
import getUserProfile from 'newspringchurchapp/src/tabs/connect/getUserProfile';
import AddPrayerCardConnected from './AddPrayerCardConnected';

const mocks = [
  {
    request: {
      query: getUserProfile,
    },
    result: {
      data: {
        currentUser: { profile: { photo: { uri: 'fakeURL' } } },
      },
    },
  },
];

it('renders AddPrayerCardConnected', async () => {
  const tree = await renderWithApolloData(
    <Providers mocks={mocks}>
      <AddPrayerCardConnected />
    </Providers>
  );
  expect(tree).toMatchSnapshot();
});
