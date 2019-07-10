import React from 'react';
import renderer from 'react-test-renderer';
import Providers from 'newspringchurchapp/src/Providers';

import WithYou from '.';

describe('The WithYou component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <WithYou navigation={jest.fn()} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
