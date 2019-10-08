import hoistNonReactStatic from 'hoist-non-react-statics';
import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';

import { BackgroundView, withTheme } from '@apollosproject/ui-kit';
import Passes from '@apollosproject/ui-passes';

import { MediaPlayer } from '@apollosproject/ui-media-player';
import Auth, { ProtectedRoute } from '@apollosproject/ui-auth';

import { AnalyticsConsumer } from '@apollosproject/ui-analytics';

import Providers from './Providers';
import NavigationService from './NavigationService';
import ContentSingle from './content-single';
import Event from './event';
import Tabs from './tabs';
import PersonalDetails from './user-settings/PersonalDetails';
import ChangePassword from './user-settings/ChangePassword';
import Location from './user-settings/Locations';

import Prayer from './prayer';
import LandingScreen from './LandingScreen';
import UserWebBrowser from './user-web-browser';
import Onboarding from './ui/Onboarding';

const AppStatusBar = withTheme(({ theme }) => ({
  barStyle: 'dark-content',
  backgroundColor: theme.colors.paper,
}))(StatusBar);

const ProtectedRouteWithSplashScreen = (props) => {
  const handleOnRouteChange = () => SplashScreen.hide();

  return <ProtectedRoute {...props} onRouteChange={handleOnRouteChange} />;
};

// Hack to avoid needing to pass emailRequired through the navigator.navigate
const EnhancedAuth = (props) => (
  <Auth
    {...props}
    emailRequired={false}
    authTitleText={'Let’s connect'}
    smsPromptText={
      'Sign in to or create your NewSpring account. \n\nFill in your mobile phone number below, and let’s get started.'
    }
    smsPolicyInfo={
      'Worried about sharing your contact info? We get it. Privacy matters to you and to us. We will not share your information or contact you without your permission.'
    }
    passwordPromptText={
      'If you already get emails from NewSpring or give at NewSpring, use that email address to sign in. If you’re new to NewSpring, click the register tab.'
    }
    confirmationTitleText={'Thanks!'}
    confirmationPromptText={
      'We just texted you a shortcode. Enter it below, then hit next.'
    }
  />
);
// 😑
hoistNonReactStatic(EnhancedAuth, Auth);

const AppNavigator = createStackNavigator(
  {
    ProtectedRoute: ProtectedRouteWithSplashScreen,
    Tabs,
    ContentSingle,
    Event,
    Auth: EnhancedAuth,
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

const AppContainer = createAppContainer(AppNavigator);

const App = () => (
  <Providers>
    <BackgroundView>
      <AppStatusBar barStyle="dark-content" />
      <AnalyticsConsumer>
        {({ track }) => (
          <AppContainer
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

export default App;
