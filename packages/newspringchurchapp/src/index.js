import React, { useEffect } from 'react';
import { StatusBar, Linking } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';

import { BackgroundView, withTheme } from '@apollosproject/ui-kit';
import Passes from '@apollosproject/ui-passes';

import { MediaPlayer } from '@apollosproject/ui-media-player';
import Auth, { ProtectedRoute } from '@apollosproject/ui-auth';

import { AnalyticsConsumer } from '@apollosproject/ui-analytics';

import Providers from './Providers';
import NavigationService from './NavigationService';
import ContentSingle from './content-single';
import Tabs from './tabs';
import PersonalDetails from './user-settings/PersonalDetails';
import ChangePassword from './user-settings/ChangePassword';
import Location from './user-settings/Locations';

import Prayer from './prayer';
import LandingScreen from './LandingScreen';
import UserWebBrowser from './user-web-browser';
import Onboarding from './ui/Onboarding';
import linkParser from './Linking/LinkParser';

const AppStatusBar = withTheme(({ theme }) => ({
  barStyle: 'dark-content',
  backgroundColor: theme.colors.paper,
}))(StatusBar);

const ProtectedRouteWithSplashScreen = (props) => {
  const handleOnRouteChange = () => SplashScreen.hide();

  return <ProtectedRoute {...props} onRouteChange={handleOnRouteChange} />;
};

const AppNavigator = createStackNavigator(
  {
    ProtectedRoute: ProtectedRouteWithSplashScreen,
    Tabs,
    ContentSingle,
    Auth,
    PersonalDetails,
    ChangePassword,
    Location,
    Passes,
    UserWebBrowser,
    Onboarding,
    LandingScreen,
    Prayer,
  },
  {
    initialRouteName: 'ProtectedRoute',
    mode: 'modal',
    headerMode: 'screen',
  }
);

function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}

const App = () => {
  console.log('helllososos');

  function handleOpenURL(event) {
    console.log('url:', linkParser(event));
    linkParser(event);
  }
  useEffect((url) => {
    console.log('inside the useEffect');
    console.log(url);
    Linking.addEventListener('url', handleOpenURL);
    console.log('after the listener');
    Linking.getInitialURL().then(() => {
      if (url) {
        // fetch for the contentSingle ID here
        console.log('url jsjs', url);
        handleOpenURL({ url });
      }
    });

    return function cleanup() {
      Linking.removeEventListener('url', handleOpenURL);
    };
  });
  return (
    <Providers>
      <BackgroundView>
        <AppStatusBar barStyle="dark-content" />
        <AnalyticsConsumer>
          {({ track }) => (
            <AppNavigator
              ref={(navigatorRef) => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
              onNavigationStateChange={(prevState, currentState) => {
                const currentScreen = getActiveRouteName(currentState);
                const prevScreen = getActiveRouteName(prevState);

                if (prevScreen !== currentScreen) {
                  // the line below uses the Google Analytics tracker
                  // change the tracker here to use other Mobile analytics SDK.
                  track({ eventName: `Viewed ${currentScreen}` });
                }
              }}
            />
          )}
        </AnalyticsConsumer>
        <MediaPlayer />
      </BackgroundView>
    </Providers>
  );
};

export default App;
