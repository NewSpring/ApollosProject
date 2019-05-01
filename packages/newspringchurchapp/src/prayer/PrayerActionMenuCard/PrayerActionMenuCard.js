import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  H4,
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
  padding: theme.sizing.baseUnit * 1.5,
}))(Touchable);

const PrayerActionMenuCard = ({ exitPrayer, savePrayer, advancePrayer }) => (
  <>
    <StyledCard>
      <StyledCardContent>
        <StyledPaddedView>
          <StyledTouchable onPress={() => exitPrayer()}>
            <PaddedView>
              <NSIcon name="arrow-up" />
            </PaddedView>
            <H4>Done Praying</H4>
          </StyledTouchable>
        </StyledPaddedView>
        <StyledPaddedView>
          <StyledTouchable onPress={() => savePrayer()}>
            <PaddedView>
              <Icon name="Like" />
            </PaddedView>
            <H4>Save Prayer</H4>
          </StyledTouchable>
        </StyledPaddedView>
        <StyledPaddedView>
          <StyledTouchable onPress={() => advancePrayer()}>
            <PaddedView>
              <H4>Next Prayer</H4>
            </PaddedView>
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
