import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'newspringchurchapp/src/Providers';

import UserPrayerCard from './UserPrayerCard';

const prayer = {
  id: 'PrayerRequest:b99bbd5002a0bf8d4c73e86afe9d4787',
  firstName: 'Aaron',
  lastName: 'Attendee',
  text: 'This is a test to see if I have a prayer request.',
  enteredDateTime: '2017-04-08T11:21:53.053',
};

describe('the UserPrayerCard component', () => {
  it('renders Prayer', () => {
    const tree = renderer.create(
      <Providers>
        <UserPrayerCard
          id={prayer.id}
          text={prayer.text}
          duration={prayer.enteredDateTime}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
