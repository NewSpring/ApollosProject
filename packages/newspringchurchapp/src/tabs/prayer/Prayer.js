import React, { PureComponent } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { BackgroundView, styled } from '@apollosproject/ui-kit';
import PrayerMenu from '../../prayer';

const Header = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.paper,
  flex: 1,
}))(ScrollView);

const StyledSafeAreaView = styled({
  flex: 1,
})(SafeAreaView);

class Prayer extends PureComponent {
  static navigationOptions = () => ({
    header: null,
  });

  render() {
    return (
      <BackgroundView>
        <StyledSafeAreaView>
          <Header>
            <PrayerMenu {...this.props} />
          </Header>
        </StyledSafeAreaView>
      </BackgroundView>
    );
  }
}

export default Prayer;
