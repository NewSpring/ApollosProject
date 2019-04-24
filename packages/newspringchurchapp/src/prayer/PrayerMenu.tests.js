import React from 'react';
import renderer from 'react-test-renderer';

import PrayerMenu from '.';

it('renders prayer without crashing', () => {
  const rendered = renderer.create(<PrayerMenu />).toJSON();
  expect(rendered).toBeTruthy();
});
