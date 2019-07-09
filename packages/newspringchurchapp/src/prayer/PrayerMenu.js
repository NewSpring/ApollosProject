import React from 'react';
import { PaddedView, FlexedView, styled, H3 } from '@apollosproject/ui-kit';
import AddPrayerCard from './AddPrayer/AddPrayerCard';
import PrayerTabView from './PrayerTab/PrayerTabView';

const StyledH3 = styled(({ theme }) => ({
  color: theme.colors.white,
}))(H3);

const MenuView = styled(({ theme }) => ({
  paddingTop: theme.sizing.baseUnit * 2,
}))(FlexedView);

const PrayerMenu = ({ ...props }) => (
  <FlexedView>
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
  </FlexedView>
);

export default PrayerMenu;
