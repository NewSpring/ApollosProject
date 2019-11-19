import React from 'react';
import { ScrollView } from 'react-native';
import { PaddedView, FlexedView, styled, H3 } from '@apollosproject/ui-kit';
import AddPrayerCard from './AddPrayer/AddPrayerCard';
import PrayerTabView from './PrayerTabView';

const StyledH3 = styled(({ theme }) => ({
  color: theme.colors.white,
}))(H3);

const FlexedScrollView = styled(({ theme }) => ({
  flex: 1,
  paddingTop: theme.sizing.baseUnit,
}))(ScrollView);

const BackgroundView = styled(({ theme }) => ({
  backgroundColor: theme.colors.tertiary,
}))(FlexedView);

const PrayerMenu = ({ ...props }) => (
  <BackgroundView>
    <AddPrayerCard
      description={
        'Share a prayer request anonymously or publicly with your NewSpring Church family.'
      }
      {...props}
    />
    <FlexedScrollView>
      <PaddedView>
        <StyledH3>Pray for Others</StyledH3>
      </PaddedView>
      <PrayerTabView {...props} />
    </FlexedScrollView>
  </BackgroundView>
);

export default PrayerMenu;
