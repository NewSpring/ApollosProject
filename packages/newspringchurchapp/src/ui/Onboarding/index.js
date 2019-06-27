import React from 'react';
import { Image, View } from 'react-native';

import { ApolloConsumer } from 'react-apollo';

import { styled } from '@apollosproject/ui-kit';

import {
  AskNotificationsConnected,
  AskNameConnected,
  FeaturesConnected,
  AboutYouConnected,
  LocationFinderConnected,
  OnboardingSwiper,
} from '@apollosproject/ui-onboarding';

import { requestPushPermissions } from '@apollosproject/ui-notifications';

const ImageContainer = styled({
  justifyContent: 'flex-end',
  height: '50%',
})(View);

const StyledImage = styled({
  resizeMode: 'contain',
  height: '100%',
  width: '100%',
})(Image);

function Onboarding({ navigation }) {
  return (
    <OnboardingSwiper>
      {({ swipeForward }) => (
        <>
          <AskNameConnected onPressPrimary={swipeForward} />
          <FeaturesConnected
            onPressPrimary={swipeForward}
            BackgroundComponent={
              <ImageContainer>
                <StyledImage source={require('./img/screen1.png')} />
              </ImageContainer>
            }
          />
          <AboutYouConnected
            onPressPrimary={swipeForward}
            BackgroundComponent={
              <ImageContainer>
                <StyledImage source={require('./img/screen2.png')} />
              </ImageContainer>
            }
          />
          <LocationFinderConnected
            onPressPrimary={swipeForward}
            onNavigate={() => {
              navigation.navigate('Location', {
                onFinished: swipeForward,
              });
            }}
            BackgroundComponent={
              <ImageContainer>
                <StyledImage source={require('./img/screen3.png')} />
              </ImageContainer>
            }
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
                  <ImageContainer>
                    <StyledImage source={require('./img/screen4.png')} />
                  </ImageContainer>
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
