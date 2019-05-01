import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'newspringchurchapp/src/Providers';

import SavedPrayerCard from './SavedPrayerCard';

describe('SavedPrayerCard', () => {
  it('renders a saved prayer', () => {
    const tree = renderer.create(
      <Providers>
        <SavedPrayerCard />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
