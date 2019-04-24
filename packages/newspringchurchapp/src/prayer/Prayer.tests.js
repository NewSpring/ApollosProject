import React from 'react';
import renderer from 'react-test-renderer';

import Prayer from '.';

it('renders prayer without crashing', () => {
  const rendered = renderer.create(<Prayer />).toJSON();
  expect(rendered).toBeTruthy();
});
