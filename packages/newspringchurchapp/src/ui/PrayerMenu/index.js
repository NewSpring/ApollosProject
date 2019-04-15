import React from 'react';
import { Text } from 'react-native';
import { PaddedView, styled } from '@apollosproject/ui-kit';

const Header = styled(({ theme }) => ({
  paddingBottom: theme.sizing.baseUnit * 1.5,
  backgroundColor: theme.colors.background.paper,
  paddingTop: theme.sizing.baseUnit * 4,
}))(PaddedView);

const PrayerMenu = () => (
  <Header>
    <Text>Prayer Menu</Text>
  </Header>
);

export default PrayerMenu;
