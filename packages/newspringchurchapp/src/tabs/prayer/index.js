import { createStackNavigator } from 'react-navigation';
import tabBarIcon from '../tabBarIcon';
import AddPrayerForm from '../../prayer/AddPrayerForm';
import PrayerList from '../../prayer/PrayerList';
import Prayer from './Prayer';

const PrayerNavigator = createStackNavigator(
  {
    Prayer,
    AddPrayerForm,
    PrayerList,
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
  tabBarIcon: tabBarIcon('pray'),
};

export default PrayerNavigator;
