import React from 'react';

import renderer from 'react-test-renderer';
import Providers from 'newspringchurchapp/src/Providers';
import getSavedPrayers from '../data/queries/getSavedPrayers';
import SavedPrayerList from '.';

const savedPrayers = [
  {
    id: 'PrayerRequest:b99bbd5002a0bf8d4c73e86afe9d4786',
    firstName: 'Dan',
    lastName: 'Edwards',
    text: 'Praying for an around the world trip to happen sometime in 2020.',
    enteredDateTime: '2019-05-02T09:00:00.000',
  },
  {
    id: 'PrayerRequest:b99bbd5002a0bf8d4c73e86afe9d4786',
    firstName: 'Isaac',
    lastName: 'Hardy',
    text: 'I could really use some new Youtube subscribers to my channel.',
    enteredDateTime: '2019-05-02T09:00:00.000',
  },
  {
    id: 'PrayerRequest:b99bbd5002a0bf8d4c73e86afe9d4786',
    firstName: 'Michael',
    lastName: 'Neeley',
    text: 'Guys, just make a decision already.',
    enteredDateTime: '2019-05-02T09:00:00.000',
  },
  {
    id: 'PrayerRequest:b99bbd5002a0bf8d4c73e86afe9d4786',
    firstName: 'Rich',
    lastName: 'Dubay',
    text: 'I just want to live in a cave.',
    enteredDateTime: '2019-05-02T09:00:00.000',
  },
];

const mock = {
  request: {
    query: getSavedPrayers,
  },
  response: {
    data: {
      savedPrayers,
    },
  },
};

describe('the SavedPrayerList component', () => {
  it('renders a list of saved prayers', async () => {
    const tree = renderer.create(
      <Providers mocks={[mock]}>
        <SavedPrayerList />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
