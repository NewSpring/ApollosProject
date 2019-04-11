import React from 'react';
import { storiesOf } from '@storybook/react-native';

import AddPrayerCard from '.';

storiesOf('prayer/AddPrayer/AddPrayerCard', module).add('default', () => (
  <AddPrayerCard imgSrc={{ uri: 'https://picsum.photos/55/55?random' }} />
));
