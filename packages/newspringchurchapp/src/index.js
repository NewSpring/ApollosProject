import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from 'react-navigation';
// import { Sentry } from 'react-native-sentry';

import { BackgroundView, withTheme } from '@apollosproject/ui-kit';
import Passes from '@apollosproject/ui-passes';
import MediaPlayer from 'newspringchurchapp/src/ui/MediaPlayer';
import Auth, { ProtectedRoute } from '@apollosproject/ui-auth';

import PrayerList from './prayer/PrayerList';
import Providers from './Providers';
import NavigationService from './NavigationService';
import ContentSingle from './content-single';
import Tabs from './tabs';
import PersonalDetails from './user-settings/PersonalDetails';
import ChangePassword from './user-settings/ChangePassword';
import Location from './user-settings/Locations';
import { LocationFinderMapView } from './ui/Onboarding/slides/LocationFinder';
import UserWebBrowser from './user-web-browser';
import Onboarding from './onboarding';
import Prayer from './prayer';

const AppStatusBar = withTheme(({ theme }) => ({
  barStyle: 'dark-content',
  backgroundColor: theme.colors.paper,
}))(StatusBar);

const AppNavigator = createStackNavigator(
  {
    ProtectedRoute,
    Tabs,
    ContentSingle,
    Auth,
    PersonalDetails,
    ChangePassword,
    Location,
    LocationFinderMapView,
    Passes,
    UserWebBrowser,
    Onboarding,
    Prayer,
    PrayerList,
  },
  {
    initialRouteName: 'ProtectedRoute',
    mode: 'modal',
    headerMode: 'screen',
  }
);

const App = () => (
  <Providers>
    <BackgroundView>
      <AppStatusBar barStyle="dark-content" />
      <AppNavigator
        ref={(navigatorRef) => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
      <MediaPlayer />
    </BackgroundView>
  </Providers>
);

export default App;
