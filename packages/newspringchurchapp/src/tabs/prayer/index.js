import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Svg from 'react-native-svg';
import { Icon } from '@apollosproject/ui-kit';
import tabBarIcon from '../tabBarIcon';
import prayerIcon from '../../../assets/icons/pray.svg';

import Prayer from './Prayer';

export const PrayerNavigator = createStackNavigator(
  {
    Prayer,
  },
  {
    initialRouteName: 'Prayer',
    headerMode: 'float',
    headerTransitionPreset: 'fade-in-place',
  }
);

PrayerNavigator.navigationOptions = {
  tabBarIcon: <prayerIcon width={24} height={24} />,
};

export default PrayerNavigator;
