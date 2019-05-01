import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'newspringchurchapp/src/Providers';

import { SaveIcon } from '.';

describe('the Like component', () => {
  it('should render a Like', () => {
    const tree = renderer.create(
      <Providers>
        <SaveIcon itemId={'abc'} isLiked={false} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });

  it('should render a UnLike', () => {
    const tree = renderer.create(
      <Providers>
        <SaveIcon itemId={'abc'} isLiked />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
