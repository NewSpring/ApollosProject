import React from 'react';
import { storiesOf } from '@storybook/react-native';

import MyPrayerCard from './MyPrayerCard';

storiesOf('MyPrayerCard', module).add('Example', () => (
  <MyPrayerCard
    duration={'20190316'}
    text={
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }
    isLoading={false}
  />
));
