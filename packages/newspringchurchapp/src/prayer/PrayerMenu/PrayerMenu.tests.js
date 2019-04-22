import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'newspringchurchapp/src/Providers';

import PrayerMenu from '.';

describe('the PrayerMenu component', () => {
  it('renders the prayer menu', () => {
    const tree = renderer.create(
      <Providers>
        <PrayerMenu />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
