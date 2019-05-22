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

const StyledTouchableView = styled({
  alignItems: 'center',
})(PaddedView);

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

    const savePrayerAction = () => {
      savePrayer();
      this.handleOnSavePrayer();
    };

    const savePrayerIcon = this.state.hasSavedPrayer ? 'LikeSolid' : 'Like';

    // TO-DO: Once we get a more cohesive icon system, we can refactor this.
    const Actions = [
      {
        key: 1,
        handleOnPressAction: exitPrayer,
        iconName: 'arrow-up',
        actionText: 'Done Praying',
        nsIcon: true,
      },
      {
        key: 2,
        handleOnPressAction: savePrayerAction,
        iconName: savePrayerIcon,
        actionText: 'Save Prayer',
        nsIcon: false,
      },
      {
        key: 3,
        handleOnPressAction: advancePrayer,
        iconName: 'arrow-down',
        actionText: 'Next Prayer',
        nsIcon: true,
      },
    ];

    const ActionButton = ({ onPressAction, iconName, actionText, nsIcon }) => (
      <StyledPaddedView>
        <Touchable onPress={() => onPressAction()}>
          <StyledTouchableView>
            <PaddedView>
              {nsIcon ? <NSIcon name={iconName} /> : <Icon name={iconName} />}
            </PaddedView>
            <H4>{actionText}</H4>
          </StyledTouchableView>
        </Touchable>
      </StyledPaddedView>
    );
    return (
      <StyledCard expandedHeight={expandedHeight}>
        <StyledCardContent>
          {Actions.map((action) => (
            <ActionButton
              key={action.key}
              onPressAction={action.handleOnPressAction}
              iconName={action.iconName}
              actionText={action.actionText}
              nsIcon={action.nsIcon}
            />
          ))}
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
