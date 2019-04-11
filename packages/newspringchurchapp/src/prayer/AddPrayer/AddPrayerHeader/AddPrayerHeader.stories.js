import React from 'react';
import { storiesOf } from '@storybook/react-native';

import AddPrayerHeader from './AddPrayerHeader';

storiesOf('prayer/AddPrayer/AddPrayerHeader', module).add('default', () => (
  <AddPrayerHeader imgSrc={{ uri: 'https://picsum.photos/55/55?random' }} />
));
