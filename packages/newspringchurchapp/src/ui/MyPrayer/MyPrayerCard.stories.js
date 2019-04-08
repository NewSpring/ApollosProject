import React from 'react';
import { storiesOf } from '@storybook/react-native';

import MyPrayerCard from '.';

storiesOf('MyPrayerCard', module).add('Example', () => (
  <MyPrayerCard
    duration={'3 days ago'}
    text={'This is my test prayer'}
    isLoading={false}
  />
));
