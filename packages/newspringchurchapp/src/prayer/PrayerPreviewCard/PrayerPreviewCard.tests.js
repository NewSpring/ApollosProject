import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'newspringchurchapp/src/Providers';

import PrayerPreviewCard from '.';

const cardData = {
  imageSource: {
    uri: 'https://fillmurray.com/400/600',
  },
  name: 'Bill',
  overlayColor: ['#FFF', '#FFF'],
  prayer:
    'I want to go back to school for my PTA degree next year, but I’m afraid of not getting accepted. I have a great job right now but I’m not very happy. Pray my plans for school align with God’s plans for me.',
  source: 'Anderson',
};

describe('the PrayerMenuCard component', () => {
  it('renders a prayer menu card', () => {
    const tree = renderer.create(
      <Providers>
        <PrayerPreviewCard
          imageSource={cardData.imageSource}
          name={cardData.name}
          overlayColor={cardData.overlayColor}
          prayer={cardData.prayer}
          source={cardData.source}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
