import React, { PureComponent } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { BackgroundView, styled } from '@apollosproject/ui-kit';
import PrayerMenu from '../../prayer/PrayerMenu';

const Header = styled(({ theme }) => ({
  paddingBottom: theme.sizing.baseUnit * 1.5,
  backgroundColor: theme.colors.background.paper,
  paddingTop: theme.sizing.baseUnit * 4,
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
