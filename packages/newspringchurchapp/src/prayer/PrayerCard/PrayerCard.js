import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import ActionSheet from 'react-native-actionsheet';
import {
  Avatar,
  BodyText,
  Card,
  CardContent,
  H3,
  H6,
  PaddedView,
  styled,
  Touchable,
  ButtonLink,
  ChannelLabel,
} from '@apollosproject/ui-kit';

const StyledCard = styled(() => ({
  marginHorizontal: 0,
  marginVertical: 0,
}))(Card);

const EllipsisView = styled(({ theme }) => ({
  paddingHorizontal: theme.sizing.baseUnit,
}))(View);

const GreyH3 = styled(({ theme }) => ({
  color: theme.colors.text.tertiary,
  textAlign: 'right',
}))(H3);

const GreyH6 = styled(({ theme }) => ({
  color: theme.colors.text.tertiary,
}))(H6);

const StyledCardContent = styled(() => ({
  alignItems: 'center',
}))(CardContent);

const StyledBodyText = styled(({ theme }) => ({
  marginTop: theme.sizing.baseUnit * 1.5,
  height: theme.sizing.baseUnit * 16,
  textAlign: 'center',
}))(BodyText);

class PrayerCard extends PureComponent {
  handleShowActionSheet = () => {
    this.ActionSheet.show();
  };

  render() {
    const { imageSource, name, text, id, source, flagRequest } = this.props;
    const cancelIndex = 1;
    const destructiveIndex = 0;
    const handleOnPress = (index) => {
      if (index !== cancelIndex) {
        return flagRequest(id);
      }
      return index;
    };
    const options = ['Report Prayer Request', 'Cancel'];
    return (
      <StyledCard>
        <EllipsisView>
          <ButtonLink onPress={this.handleShowActionSheet}>
            <GreyH3>...</GreyH3>
          </ButtonLink>
          <ActionSheet
            ref={(o) => {
              this.ActionSheet = o;
            }}
            title={'Would you like to report the prayer request?'}
            options={options}
            cancelButtonIndex={cancelIndex}
            destructiveButtonIndex={destructiveIndex}
            onPress={(index) => handleOnPress(index)}
          />
        </EllipsisView>
        <StyledCardContent>
          <Avatar source={imageSource} size="medium" />
          <H3> Pray For {name}</H3>
          <GreyH6>{source}</GreyH6>
          <PaddedView>
            <StyledBodyText>{text}</StyledBodyText>
          </PaddedView>
          <PaddedView>
            <Touchable onPress={() => {}}>
              <ChannelLabel icon="information" label="How to Pray?" />
            </Touchable>
          </PaddedView>
        </StyledCardContent>
      </StyledCard>
    );
  }
}

PrayerCard.propTypes = {
  imageSource: PropTypes.objectOf(PropTypes.string),
  name: PropTypes.string,
  text: PropTypes.string,
  source: PropTypes.string,
  id: PropTypes.string,
  flagRequest: PropTypes.func,
};

export default PrayerCard;
