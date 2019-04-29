import { createStackNavigator } from 'react-navigation';
import { tabBarIconNewSpring } from '../tabBarIcon';
import { AddPrayerFormConnected } from '../../prayer/AddPrayer/AddPrayerForm';
import Prayer from './Prayer';

const PrayerNavigator = createStackNavigator(
  {
    Prayer,
    AddPrayerFormConnected,
  },
  {
    initialRouteName: 'Prayer',
    headerMode: 'float',
    headerTransitionPreset: 'fade-in-place',
    mode: 'modal',
  }
);

// TODO: Go back and use the TAP core icon when we get an updated ui-kit
PrayerNavigator.navigationOptions = {
  tabBarIcon: tabBarIconNewSpring('pray'),
};

export default PrayerNavigator;
