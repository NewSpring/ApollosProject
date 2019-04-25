import React, { memo } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { tabBarIconNewSpring } from '../tabBarIcon';
import AddPrayerForm from '../../prayer/AddPrayer/AddPrayerForm';
import Prayer from './Prayer';

// class AddPrayerFormScreen extends React.Component {
// render() {
// return (
// <View>
// <AddPrayerForm {...this.props} />
// </View>
// );
// }
// }

const PrayerNavigator = createStackNavigator(
  {
    Prayer,
    AddPrayerForm: {
      screen: () => <AddPrayerForm />, // eslint-disable-line react/display-name
      navigationOptions: { header: null },
    },
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
