import React from 'react';

import Providers from 'newspringchurchapp/src/Providers';
import { renderWithApolloData } from 'newspringchurchapp/src/utils/testUtils';
import getProfilePic from '../../getProfilePic';
import AddPrayerCardConnected from './AddPrayerCardConnected';

const mocks = [
  {
    request: {
      query: getProfilePic,
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
