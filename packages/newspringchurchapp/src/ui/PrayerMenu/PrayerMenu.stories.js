import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { PaddedView } from '@apollosproject/ui-kit';

import PrayerMenu from '.';

storiesOf('PrayerMenu', module).add('Example', () => (
  <PaddedView>
    <PrayerMenu />
  </PaddedView>
));
