import React, { PureComponent } from 'react';
import { SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { BackgroundView, styled } from '@apollosproject/ui-kit';
import PrayerMenu from '../../prayer';

// const { height } = Dimensions.get('window');
const Header = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.paper,
}))(ScrollView);
// marginTop: theme.sizing.baseUnit * 6,
// height,

class Prayer extends PureComponent {
  static navigationOptions = () => ({
    header: null,
  });

  render() {
    return (
      <BackgroundView>
        <SafeAreaView>
          <Header>
            <PrayerMenu {...this.props} />
          </Header>
        </SafeAreaView>
      </BackgroundView>
    );
  }
}

export default Prayer;
