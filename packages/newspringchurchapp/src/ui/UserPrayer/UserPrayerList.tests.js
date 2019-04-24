import React from 'react';
import { renderWithApolloData } from 'newspringchurchapp/src/utils/testUtils';

import Providers from 'newspringchurchapp/src/Providers';
import getUserPrayers from './getUserPrayers';
import UserPrayerList from '.';

const prayers = [
  {
    id: 'PrayerRequest:b99bbd5002a0bf8d4c73e86afe9d4786',
    firstName: 'Aaron',
    lastName: 'Attendee',
    text: 'This is a test to see if I have a prayer request.',
    enteredDateTime: '2017-04-08T11:21:53.053',
  },
  {
    id: 'PrayerRequest:b99bbd5002a0bf8d4c73e86afe9d4787',
    firstName: 'Aaron',
    lastName: 'Attendee',
    text: 'This is another test to see if I have a prayer request.',
    enteredDateTime: '2017-04-09T11:21:53.053',
  },
  {
    id: 'PrayerRequest:b99bbd5002a0bf8d4c73e86afe9d4788',
    firstName: 'Aaron',
    lastName: 'Attendee',
    text: 'This is just another test to see if I have a prayer request.',
    enteredDateTime: '2017-04-11T11:21:53.053',
  },
  {
    id: 'PrayerRequest:b99bbd5002a0bf8d4c73e86afe9d4789',
    firstName: 'Aaron',
    lastName: 'Attendee',
    text: 'This, yet again, is a test to see if I have a prayer request.',
    enteredDateTime: '2017-04-10T11:21:53.053',
  },
];

describe('the UserPrayerList component', () => {
  it('renders a list of prayers', async () => {
    const mock = {
      request: {
        query: getUserPrayers,
      },
      response: {
        data: {
          prayers,
        },
      },
    };
    const tree = await renderWithApolloData(
      <Providers mocks={[mock]} addTypename={false}>
        <UserPrayerList />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
