import { createStackNavigator } from 'react-navigation';
import tabBarIcon from '../tabBarIcon';
import { AddPrayerFormConnected } from '../../prayer/AddPrayer/AddPrayerForm';
import PrayerList from '../../prayer/PrayerList';
import Prayer from './Prayer';

const PrayerNavigator = createStackNavigator(
  {
    Prayer,
    AddPrayerFormConnected,
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
PrayerNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarIcon: tabBarIcon('pray'),
  };
};

export default PrayerNavigator;
