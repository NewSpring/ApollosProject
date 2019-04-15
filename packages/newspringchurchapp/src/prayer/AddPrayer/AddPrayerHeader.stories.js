import React from 'react';
import { storiesOf } from '@storybook/react-native';

import AddPrayerHeader from './AddPrayerHeader';

storiesOf('prayer/AddPrayer/AddPrayerHeader', module)
  .add('default', () => <AddPrayerHeader />)
  .add('imgSrc', () => (
    <AddPrayerHeader imgSrc={{ uri: 'https://picsum.photos/55/55?random' }} />
  ))
  .add('title', () => <AddPrayerHeader title={'This is a custom title'} />);
