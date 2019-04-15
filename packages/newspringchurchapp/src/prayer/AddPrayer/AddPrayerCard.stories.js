import React from 'react';
import { storiesOf } from '@storybook/react-native';

import AddPrayerCard from './AddPrayerCard';

storiesOf('prayer/AddPrayer/AddPrayerCard', module)
  .add('default', () => <AddPrayerCard />)
  .add('imgSrc', () => (
    <AddPrayerCard imgSrc={{ uri: 'https://picsum.photos/55/55?random' }} />
  ))
  .add('description', () => (
    <AddPrayerCard
      description={
        'This is a custom card description. It sounds really good when you read it out load.'
      }
    />
  ));
