import React from 'react';
import renderer from 'react-test-renderer';
import Providers from 'newspringchurchapp/src/Providers';

import SermonNotes from '.';

const features = [
  {
    props: {
      children: [
        {
          props: {
            id: 'TextFeature:123',
            card: false,
            header: false,
            body: 'This is a text feature',
            contentId: 'WeekendContentItem:123',
            sharing: { message: 'This is a text feature' },
          },
        },
      ],
    },
  },
];

describe('The SermonNotes component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <SermonNotes />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with a title, series, a text feature, and one speaker', () => {
    const tree = renderer.create(
      <Providers>
        <SermonNotes
          title={'A Fun Sunday'}
          series={'A Fun Series'}
          communicators={[
            { firstName: 'Bradford', nickName: 'Brad', lastName: 'Cooper' },
          ]}
          features={features}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
