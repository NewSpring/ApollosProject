import React from 'react';
import { renderWithApolloData } from 'newspringchurchapp/src/utils/testUtils';

import Providers from 'newspringchurchapp/src/Providers';
import flagPrayerRequest from './flagPrayerRequest';
import PrayerCardConnected from './PrayerCardConnected';

const prayerId = [
  {
    id: 'PrayerRequest:b99bbd5002a0bf8d4c73e86afe9d4789',
  },
];

describe('the UserPrayerList component', () => {
  it('renders a list of prayers', async () => {
    const mock = {
      request: {
        query: flagPrayerRequest,
      },
      response: {
        data: {
          prayerId,
        },
      },
    };
    const tree = await renderWithApolloData(
      <Providers mocks={[mock]} addTypename={false}>
        <PrayerCardConnected />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
