import React, { PureComponent } from 'react';
import { SafeAreaView } from 'react-navigation';
import { styled, FlexedView } from '@apollosproject/ui-kit';
import PrayerMenu from '../../prayer';

const Header = styled(({ theme }) => ({
  backgroundColor: theme.colors.tertiary,
}))(FlexedView);

const StyledSafeAreaView = styled(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background.paper,
}))(SafeAreaView);

class Prayer extends PureComponent {
  static navigationOptions = () => ({
    header: null,
  });

  render() {
    return (
      <StyledSafeAreaView>
        <Header>
          <PrayerMenu {...this.props} />
        </Header>
      </StyledSafeAreaView>
    );
  }
}

export default Prayer;
