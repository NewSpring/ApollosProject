import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { PaddedView } from '@apollosproject/ui-kit';

import PrayerActionMenuCard from './PrayerActionMenuCard';

storiesOf('PrayerActionMenuCard', module).add('Example', () => (
  <PaddedView>
    <PrayerActionMenuCard />
  </PaddedView>
));
