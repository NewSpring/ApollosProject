import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'newspringchurchapp/src/Providers';

import PrayerActionMenuCard from './PrayerActionMenuCard';

describe('the PrayerActionMenuCard component', () => {
  it('renders a prayer action menu card', () => {
    const tree = renderer.create(
      <Providers>
        <PrayerActionMenuCard />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
