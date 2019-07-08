import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { PaddedView } from '@apollosproject/ui-kit';

import PrayerSingle from '.';

const cardData = {
  id: 'PrayerRequest:519df72a48836aa524655df9cceb6989',
  imageSource: {
    uri: 'https://fillmurray.com/400/600',
  },
  name: 'Bill',
  text:
    'I’m alright. Nobody worry ’bout me. Why you got to gimme a fight? Can’t you just let it be?',
  source: 'Anderson',
};

storiesOf('PrayerSingle', module).add('Example', () => (
  <PaddedView>
    <PrayerSingle
      actionsEnabled={false}
      imageSource={cardData.imageSource}
      name={cardData.name}
      text={cardData.text}
      source={cardData.source}
    />
  </PaddedView>
));

storiesOf('PrayerSingle', module).add('actionsEnabled', () => (
  <PaddedView>
    <PrayerSingle
      actionsEnabled
      id={cardData.id}
      imageSource={cardData.imageSource}
      name={cardData.name}
      text={cardData.text}
      source={cardData.source}
    />
  </PaddedView>
));
