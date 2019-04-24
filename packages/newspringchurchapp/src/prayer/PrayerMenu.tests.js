import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'newspringchurchapp/src/Providers';
import PrayerMenu from '.';

it('renders prayer without crashing', () => {
  const rendered = renderer
    .create(
      <Providers>
        <PrayerMenu />
      </Providers>
    )
    .toJSON();
  expect(rendered).toBeTruthy();
});
