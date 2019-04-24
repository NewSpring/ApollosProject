import React, { PureComponent } from 'react';
import { SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { BackgroundView, styled } from '@apollosproject/ui-kit';
import PrayerMenu from '../../prayer';

const { height } = Dimensions.get('window');
const Header = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.paper,
  marginTop: theme.sizing.baseUnit * 6,
  height,
}))(ScrollView);

class Prayer extends PureComponent {
  static navigationOptions = () => ({
    header: null,
  });

  render() {
    return (
      <BackgroundView>
        <SafeAreaView>
          <Header>
            <PrayerMenu />
          </Header>
        </SafeAreaView>
      </BackgroundView>
    );
  }
}

export default Prayer;
