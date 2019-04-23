import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { PaddedView } from '@apollosproject/ui-kit';

import PrayerPreviewCard from '.';

const cardData = {
  imageSource: {
    uri: 'https://fillmurray.com/400/600',
  },
  name: 'Bill',
  overlayColor: ['#FFF', '#FFF'],
  prayer:
    'I’m alright. Nobody worry ’bout me. Why you got to gimme a fight? Can’t you just let it be?',
  source: 'Anderson',
};

storiesOf('prayer/PrayerPreviewCard', module).add('Example', () => (
  <PaddedView>
    <PrayerPreviewCard
      imageSource={cardData.imageSource}
      name={cardData.name}
      overlayColor={cardData.overlayColor}
      prayer={cardData.prayer}
      source={cardData.source}
    />
  </PaddedView>
));
