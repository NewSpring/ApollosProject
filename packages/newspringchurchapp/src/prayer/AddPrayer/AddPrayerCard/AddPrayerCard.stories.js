import React from 'react';
import { storiesOf } from '@storybook/react-native';

import AddPrayerCard from '.';

storiesOf('prayer/AddPrayer/AddPrayerCard', module)
  .add('default', () => <AddPrayerCard />)
  .add('avatarSource', () => (
    <AddPrayerCard
      avatarSource={{ uri: 'https://picsum.photos/55/55?random' }}
    />
  ))
  .add('description', () => (
    <AddPrayerCard
      description={
        'This is a custom card description. It sounds really good when you read it out load.'
      }
    />
  ));
