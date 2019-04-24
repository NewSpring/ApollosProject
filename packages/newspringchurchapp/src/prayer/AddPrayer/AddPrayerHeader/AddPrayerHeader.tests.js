import React from 'react';
import renderer from 'react-test-renderer';
import Providers from 'newspringchurchapp/src/Providers';

import AddPrayerHeader from '.';

describe('The AddPrayerHeader component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <AddPrayerHeader />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a custom avatar', () => {
    const tree = renderer.create(
      <Providers>
        <AddPrayerHeader
          imgSrc={{ uri: 'https://picsum.photos/55/55?random' }}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a custom title', () => {
    const tree = renderer.create(
      <Providers>
        <AddPrayerHeader title={'custom title'} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
