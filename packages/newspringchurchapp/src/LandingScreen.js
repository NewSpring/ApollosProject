import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import { styled } from '@apollosproject/ui-kit';

import ApollosLandingScreen from './ui/LandingScreen';

const FullScreenImage = styled({
  resizeMode: 'cover',
  position: 'absolute',
  width: '100%',
  height: '100%',
})(Image);

const LandingScreen = ({ navigation }) => (
  <ApollosLandingScreen
    onPressPrimary={() => navigation.push('Auth')}
    textColor={'white'}
    BackgroundComponent={
      <FullScreenImage source={require('./ui/LandingScreen/img/landing.png')} />
    }
    primaryNavText={"Let's go!"}
  />
);

LandingScreen.navigationOptions = {
  header: null,
};

LandingScreen.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default LandingScreen;
