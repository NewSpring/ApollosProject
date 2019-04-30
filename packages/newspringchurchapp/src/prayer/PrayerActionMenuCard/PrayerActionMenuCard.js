import React from 'react';
import {
  Card,
  CardContent,
  H5,
  styled,
  Touchable,
  Icon,
  PaddedView,
} from '@apollosproject/ui-kit';

import NSIcon from 'newspringchurchapp/src/ui/NSIcon';

const StyledCard = styled(() => ({
  marginHorizontal: 0,
  marginVertical: 0,
}))(Card);

const StyledCardContent = styled(() => ({
  alignItems: 'center',
}))(CardContent);

const StyledPaddedView = styled(() => ({
  alignItems: 'center',
}))(PaddedView);

const StyledTouchable = styled(({ theme }) => ({
  alignItems: 'center',
  padding: theme.sizing.baseUnit * 2,
}))(Touchable);

const PrayerActionMenuCard = () => (
  <>
    <StyledCard>
      <StyledCardContent>
        <StyledPaddedView>
          <StyledTouchable onPress={() => {}}>
            <NSIcon name="arrow-up" />
            <H5>Done Praying</H5>
          </StyledTouchable>
        </StyledPaddedView>
        <StyledPaddedView>
          <StyledTouchable onPress={() => {}}>
            <Icon name="Like" />
            <H5>Save Prayer</H5>
          </StyledTouchable>
        </StyledPaddedView>
        <StyledPaddedView>
          <StyledTouchable onPress={() => {}}>
            <H5>Done Praying</H5>
            <NSIcon name="arrow-down" />
          </StyledTouchable>
        </StyledPaddedView>
      </StyledCardContent>
    </StyledCard>
  </>
);

export default PrayerActionMenuCard;
