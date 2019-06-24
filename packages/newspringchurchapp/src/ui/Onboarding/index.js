import React from 'react';
import { Image } from 'react-native';

import { ApolloConsumer } from 'react-apollo';

import {
  AskNotificationsConnected,
  AskNameConnected,
  FeaturesConnected,
  AboutYouConnected,
  LocationFinderConnected,
  OnboardingSwiper,
} from '@apollosproject/ui-onboarding';

import { requestPushPermissions } from '@apollosproject/ui-notifications';

function Onboarding({ navigation }) {
  return (
    <OnboardingSwiper>
      {({ swipeForward }) => (
        <>
          <AskNameConnected onPressPrimary={swipeForward} />
          <FeaturesConnected
            onPressPrimary={swipeForward}
            BackgroundComponent={<Image source={require('./img/slide1.png')} />}
          />
          <AboutYouConnected
            onPressPrimary={swipeForward}
            BackgroundComponent={<Image source={require('./img/slide2.png')} />}
          />
          <LocationFinderConnected
            onPressPrimary={swipeForward}
            onNavigate={() => {
              navigation.navigate('Location', {
                onFinished: swipeForward,
              });
            }}
            BackgroundComponent={<Image source={require('./img/slide3.png')} />}
          />
          <ApolloConsumer>
            {(client) => (
              <AskNotificationsConnected
                onPressPrimary={() => navigation.replace('Tabs')}
                onRequestPushPermissions={() =>
                  requestPushPermissions({ client })
                }
                primaryNavText={'Finish'}
                BackgroundComponent={
                  <Image source={require('./img/slide4.png')} />
                }
              />
            )}
          </ApolloConsumer>
        </>
      )}
    </OnboardingSwiper>
  );
}

Onboarding.navigationOptions = {
  title: 'Onboarding',
  header: null,
  gesturesEnabled: false,
};

export default Onboarding;
