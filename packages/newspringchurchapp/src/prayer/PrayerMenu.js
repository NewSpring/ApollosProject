import React from 'react';
import { PaddedView, FlexedView, styled, H3 } from '@apollosproject/ui-kit';
import AddPrayerCard from './AddPrayer/AddPrayerCard';
import PrayerTabView from './PrayerTabView';

const StyledH3 = styled(({ theme }) => ({
  color: theme.colors.white,
}))(H3);

const MenuView = styled(({ theme }) => ({
  paddingTop: theme.sizing.baseUnit,
}))(FlexedView);

const Container = styled(({ theme }) => ({
  backgroundColor: theme.colors.tertiary,
}))(FlexedView);

const PrayerMenu = ({ ...props }) => (
  <Container>
    <AddPrayerCard
      description={
        'Take a moment to send a prayer request that your NewSpring Church family can pray for.'
      }
      {...props}
    />
    <MenuView>
      <PaddedView>
        <StyledH3>Pray for Others</StyledH3>
      </PaddedView>
      <PrayerTabView {...props} />
    </MenuView>
  </Container>
);

export default PrayerMenu;
