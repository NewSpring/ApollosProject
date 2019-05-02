import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { PaddedView } from '@apollosproject/ui-kit';

import PrayerCard from './PrayerCard';

const cardData = {
  imageSource: {
    uri: 'https://fillmurray.com/400/600',
  },
  name: 'Bill',
  text:
    'I’m alright. Nobody worry ’bout me. Why you got to gimme a fight? Can’t you just let it be?',
  source: 'Anderson',
};

storiesOf('PrayerCard', module).add('Example', () => (
  <PaddedView>
    <PrayerCard
      imageSource={cardData.imageSource}
      name={cardData.name}
      text={cardData.text}
      source={cardData.source}
    />
  </PaddedView>
));
