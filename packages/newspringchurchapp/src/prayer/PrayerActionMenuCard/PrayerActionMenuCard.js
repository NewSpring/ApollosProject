import React, { PureComponent } from 'react';
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

const StyledCard = styled(({ expandedHeight }) => ({
  marginHorizontal: 0,
  marginVertical: 0,
  height: expandedHeight,
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

class PrayerActionMenuCard extends PureComponent {
  state = {
    hasSavedPrayer: false,
  };

  handleOnSavePrayer = () => this.setState({ hasSavedPrayer: true });

  render() {
    const {
      exitPrayer,
      savePrayer,
      advancePrayer,
      expandedHeight,
    } = this.props;
    return (
      <StyledCard expandedHeight={expandedHeight}>
        <StyledCardContent>
          <StyledPaddedView>
            {/* TODO: Practice good DRY methods by combing these three touchables into a reusable component */}
            <StyledTouchable onPress={() => exitPrayer()}>
              <PaddedView>
                <NSIcon name="arrow-up" />
              </PaddedView>
              <H4>Done Praying</H4>
            </StyledTouchable>
          </StyledPaddedView>
          <StyledPaddedView>
            <StyledTouchable
              onPress={() => {
                savePrayer();
                this.handleOnSavePrayer();
              }}
            >
              <PaddedView>
                <Icon name={this.state.hasSavedPrayer ? 'LikeSolid' : 'Like'} />
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
    );
  }
}

PrayerActionMenuCard.propTypes = {
  exitPrayer: PropTypes.func,
  savePrayer: PropTypes.func,
  advancePrayer: PropTypes.func,
  expandedHeight: PropTypes.number,
};

PrayerActionMenuCard.displayName = 'PrayerActionMenuCard';

export default PrayerActionMenuCard;
