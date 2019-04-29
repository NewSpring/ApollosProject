import React from 'react';

import Providers from 'newspringchurchapp/src/Providers';
import { renderWithApolloData } from 'newspringchurchapp/src/utils/testUtils';
import getProfilePic from '../../getProfilePic';
import AddPrayerFormConnected from './AddPrayerFormConnected';

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

it('renders AddPrayerFormConnected', async () => {
  const tree = await renderWithApolloData(
    <Providers mocks={mocks}>
      <AddPrayerFormConnected navigation={{}} />
    </Providers>
  );
  expect(tree).toMatchSnapshot();
});