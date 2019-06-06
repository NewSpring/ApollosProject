import React from 'react';

import Providers from 'newspringchurchapp/src/Providers';
import { renderWithApolloData } from 'newspringchurchapp/src/utils/testUtils';
import SAVE_PRAYER from '../data/mutations/savePrayer';
import PrayerActionMenuCardConnected from './PrayerActionMenuCardConnected';

it('renders PrayerActionMenuCardConnected', async () => {
  const tree = await renderWithApolloData(
    <Providers mocks={[]}>
      <PrayerActionMenuCardConnected navigation={{}} />
    </Providers>
  );
  expect(tree).toMatchSnapshot();
});

it('renders PrayerActionMenuCardConnected when liking a prayer', async () => {
  const mocks = [
    {
      request: {
        query: SAVE_PRAYER,
        variables: { nodeId: 'PrayerRequest:ab914f6fe3271e951cde1ef1deb1736d' },
      },
      result: {
        data: {
          savePrayer: {
            id: 'PrayerRequest:ab914f6fe3271e951cde1ef1deb1736d',
          },
        },
      },
    },
  ];
  const tree = await renderWithApolloData(
    <Providers mocks={mocks}>
      <PrayerActionMenuCardConnected navigation={{}} />
    </Providers>
  );
  expect(tree).toMatchSnapshot();
});
