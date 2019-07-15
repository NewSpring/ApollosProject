import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'newspringchurchapp/src/Providers';
import PrayerTab from './index';

it('renders prayer PrayerTab', () => {
  const tree = renderer.create(
    <Providers>
      <PrayerTab prayers={[]} navigation={jest.fn()} />
    </Providers>
  );
  expect(tree).toMatchSnapshot();
});

it('renders prayer tab with content', () => {
  const tree = renderer.create(
    <Providers>
      <PrayerTab
        navigation={jest.fn()}
        prayers={[]}
        query={'GET_SAVED_PRAYERS'}
        description={'Pray for your saved prayers'}
        list={'SavedPrayerList'}
        title={'My Saved Prayers'}
        type={'saved'}
      />
    </Providers>
  );
  expect(tree).toMatchSnapshot();
});