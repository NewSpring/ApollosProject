import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'newspringchurchapp/src/Providers';

import PrayerPreviewCard from '.';

describe('the PrayerMenuCard component', () => {
  it('renders a prayer menu card', () => {
    const tree = renderer.create(
      <Providers>
        <PrayerPreviewCard
          avatarSource={{
            uri: 'https://fillmurray.com/400/600',
          }}
          name={'Bill'}
          overlayColor={['#FFF', '#FFF']}
          prayer={
            'I want to go back to school for my PTA degree next year, but I’m afraid of not getting accepted. I have a great job right now but I’m not very happy. Pray my plans for school align with God’s plans for me.'
          }
          campus={'Anderson'}
          navigation={{}}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
