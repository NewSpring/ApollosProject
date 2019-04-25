import { createStackNavigator } from 'react-navigation';
import { tabBarIconNewSpring } from '../tabBarIcon';

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

// TODO: Go back and use the TAP core icon when we get an updated ui-kit
PrayerNavigator.navigationOptions = {
  tabBarIcon: tabBarIconNewSpring('pray'),
};

export default PrayerNavigator;
