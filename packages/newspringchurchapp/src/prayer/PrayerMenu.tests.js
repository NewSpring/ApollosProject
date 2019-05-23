import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'newspringchurchapp/src/Providers';
import PrayerMenu from './PrayerMenu';

it('renders prayer menu', () => {
  const tree = renderer.create(
    <Providers>
      <PrayerMenu />
    </Providers>
  );
  expect(tree).toMatchSnapshot();
});

it('renders prayer menu with categories', () => {
  const tree = renderer.create(
    <Providers>
      <PrayerMenu
        categories={[
          {
            id: 'cat1',
            description: 'this is category 1',
            image: 'https://picsum.photos/300/300',
            overlaycolor: ['#fff', '#fff'],
            title: 'category 1',
            key: 'cat1',
          },
          {
            id: 'cat2',
            description: 'this is category 2',
            image: 'https://picsum.photos/300/300',
            overlaycolor: ['#fff', '#fff'],
            title: 'category 2',
            key: 'cat2',
          },
        ]}
      />
    </Providers>
  );
  expect(tree).toMatchSnapshot();
});
