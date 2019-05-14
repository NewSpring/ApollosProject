import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { PaddedView } from '@apollosproject/ui-kit';

import PrayerHeader from './';

const headerData = {
  imageSource: {
    uri: 'https://fillmurray.com/400/600',
  },
  name: 'Bill',
  source: 'Anderson',
};

storiesOf('PrayerHeader', module).add('Anonymous', () => (
  <PaddedView>
    <PrayerHeader
      anonymous={true}
      avatarSize={'medium'}
      avatarSource={headerData.imageSource}
      name={`Pray For ${headerData.name}`}
      source={headerData.source}
    />
  </PaddedView>
));

storiesOf('PrayerHeader', module).add('Not Anonymous', () => (
  <PaddedView>
    <PrayerHeader
      avatarSize={'medium'}
      avatarSource={headerData.imageSource}
      name={`Pray For ${headerData.name}`}
      source={headerData.source}
    />
  </PaddedView>
));
