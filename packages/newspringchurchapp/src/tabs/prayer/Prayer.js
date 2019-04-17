import React, { PureComponent } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { BackgroundView, PaddedView, styled } from '@apollosproject/ui-kit';
import PrayerMenu from '../../ui/PrayerMenu';

const Header = styled(({ theme }) => ({
  paddingBottom: theme.sizing.baseUnit * 1.5,
  backgroundColor: theme.colors.background.paper,
  paddingTop: theme.sizing.baseUnit * 4,
}))(PaddedView);

class Prayer extends PureComponent {
  static navigationOptions = () => ({
    header: null,
  });

  render() {
    return (
      <BackgroundView>
        <SafeAreaView>
          <ScrollView>
            <Header>
              <PrayerMenu />
            </Header>
          </ScrollView>
        </SafeAreaView>
      </BackgroundView>
    );
  }
}

export default Prayer;
