import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { PaddedView } from '@apollosproject/ui-kit';

import PrayerCard from './PrayerCard';

const cardData = {
  id: 'PrayerRequest:519df72a48836aa524655df9cceb6989',
  imageSource: {
    uri: 'https://fillmurray.com/400/600',
  },
  name: 'Bill',
  text:
    'I’m alright. Nobody worry ’bout me. Why you got to gimme a fight? Can’t you just let it be?',
  source: 'Anderson',
  prayerHelpContent: {
    id: 'MediaContentItem:ebb48774ff5a859981a32c1e38f7c2ec',
    title: 'Learning how to pray like Jesus',
  },
};

storiesOf('PrayerCard', module).add('Example', () => (
  <PaddedView>
    <PrayerCard
      actionsEnabled={false}
      imageSource={cardData.imageSource}
      name={cardData.name}
      text={cardData.text}
      source={cardData.source}
      prayerHelpContent={cardData.prayerHelpContent}
    />
  </PaddedView>
));

storiesOf('PrayerCard', module).add('actionsEnabled', () => (
  <PaddedView>
    <PrayerCard
      actionsEnabled
      id={cardData.id}
      imageSource={cardData.imageSource}
      name={cardData.name}
      text={cardData.text}
      source={cardData.source}
    />
  </PaddedView>
));
