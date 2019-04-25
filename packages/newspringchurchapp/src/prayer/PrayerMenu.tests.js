import React from 'react';

import Providers from 'newspringchurchapp/src/Providers';
import { renderWithApolloData } from 'newspringchurchapp/src/utils/testUtils';
import getProfilePic from './getProfilePic';
import PrayerMenu from '.';

const mocks = [
  {
    request: {
      query: getProfilePic,
    },
    result: {
      data: { currentUser: { profile: { photo: { uri: 'blahblahblah' } } } },
    },
  },
];

it('renders prayer without crashing', () => {
  renderWithApolloData(
    <Providers mocks={mocks}>
      <PrayerMenu />
    </Providers>
  );
});
