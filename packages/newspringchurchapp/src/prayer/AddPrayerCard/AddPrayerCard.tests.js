import React from 'react';
import Providers from 'newspringchurchapp/src/Providers';
import GET_USER_PROFILE from 'newspringchurchapp/src/tabs/connect/getUserProfile';
import renderer from 'react-test-renderer';
import AddPrayerCard from '.';

const mocks = [
  {
    request: {
      query: GET_USER_PROFILE,
    },
    result: {
      data: {
        currentUser: { profile: { photo: { uri: 'fakeURL' } } },
      },
    },
  },
];

describe('The AddPrayerCard component', () => {
  it('should render', async () => {
    const tree = renderer.create(
      <Providers mocks={mocks}>
        <AddPrayerCard />
      </Providers>
    );

    expect(tree).toMatchSnapshot();
  });
  it('should render a custom avatar', async () => {
    const tree = renderer.create(
      <Providers mocks={mocks}>
        <AddPrayerCard
          avatarSource={{ uri: 'https://picsum.photos/55/55?random' }}
        />
      </Providers>
    );

    expect(tree).toMatchSnapshot();
  });
  it('should render a custom title', async () => {
    const tree = renderer.create(
      <Providers mocks={mocks}>
        <AddPrayerCard
          description={'this is a custom description for the card.'}
        />
      </Providers>
    );

    expect(tree).toMatchSnapshot();
  });
});
