import React from 'react';
import renderer from 'react-test-renderer';
import wait from 'waait';
import Providers from 'newspringchurchapp/src/Providers';
import getSavedPrayers from '../data/queries/getSavedPrayers';
import SavedPrayerList from '.';

const mock = {
  request: {
    query: getSavedPrayers,
  },
  result: {
    data: {
      savedPrayers: [
        {
          id: 'PrayerRequest:d13a81b4b14c4ae89db1a241c9d99a79',
          campus: {
            id: 'Campus:4f68015ba18662a7409d1219a4ce013e',
            name: 'Anderson',
          },
          firstName: 'Isaac',
          lastName: 'Hardy',
          text: 'I could really use some new Youtube subscribers',
          enteredDateTime: '2019-05-01T22:25:06.453',
          person: {
            photo: {
              uri: null,
            },
          },
          isAnonymous: false,
        },
      ],
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
    await wait(0); // wait for response from graphql
    expect(tree).toMatchSnapshot();
  });
});
