import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'newspringchurchapp/src/Providers';

import PrayerCard from './PrayerCard';

const cardData = {
  imageSource: {
    uri: 'https://fillmurray.com/400/600',
  },
  name: 'Bill',
  prayer:
    'I want to go back to school for my PTA degree next year, but I’m afraid of not getting accepted. I have a great job right now but I’m not very happy. Pray my plans for school align with God’s plans for me.',
  source: 'Anderson',
};

describe('the PrayerCard component', () => {
  it('renders a prayer card', () => {
    const tree = renderer.create(
      <Providers>
        <PrayerCard
          imageSource={cardData.imageSource}
          name={cardData.name}
          prayer={cardData.prayer}
          source={cardData.source}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
