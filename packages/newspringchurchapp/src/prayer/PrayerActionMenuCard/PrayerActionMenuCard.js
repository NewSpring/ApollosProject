import React from 'react';
import PropTypes from 'prop-types';
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

const PrayerActionMenuCard = ({ exitPrayer, savePrayer, advancePrayer }) => (
  <>
    <StyledCard>
      <StyledCardContent>
        <StyledPaddedView>
          <StyledTouchable onPress={() => exitPrayer()}>
            <NSIcon name="arrow-up" />
            <H5>Done Praying</H5>
          </StyledTouchable>
        </StyledPaddedView>
        <StyledPaddedView>
          <StyledTouchable onPress={() => savePrayer()}>
            <Icon name="Like" />
            <H5>Save Prayer</H5>
          </StyledTouchable>
        </StyledPaddedView>
        <StyledPaddedView>
          <StyledTouchable onPress={() => advancePrayer()}>
            <H5>Done Praying</H5>
            <NSIcon name="arrow-down" />
          </StyledTouchable>
        </StyledPaddedView>
      </StyledCardContent>
    </StyledCard>
  </>
);

PrayerActionMenuCard.propTypes = {
  exitPrayer: PropTypes.func,
  savePrayer: PropTypes.func,
  advancePrayer: PropTypes.func,
};

export default PrayerActionMenuCard;
