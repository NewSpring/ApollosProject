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

    const savePrayerIcon = this.state.hasSavedPrayer ? 'like-solid' : 'like';

    // TO-DO: Once we get a more cohesive icon system, we can refactor this.
    const Actions = [
      {
        key: 1,
        handleOnPressAction: exitPrayer,
        iconName: 'arrow-up',
        actionText: 'Done Praying',
      },
      {
        key: 2,
        handleOnPressAction: savePrayerAction,
        iconName: savePrayerIcon,
        actionText: 'Save Prayer',
      },
      {
        key: 3,
        handleOnPressAction: advancePrayer,
        iconName: 'arrow-down',
        actionText: 'Next Prayer',
      },
    ];

    const ActionButton = ({ onPressAction, iconName, actionText }) => (
      <StyledPaddedView>
        <Touchable onPress={() => onPressAction()}>
          <StyledTouchableView>
            <PaddedView>
              <Icon name={iconName} />
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
