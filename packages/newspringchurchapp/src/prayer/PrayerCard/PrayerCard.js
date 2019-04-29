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
  H4,
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
  paddingTop: theme.sizing.baseUnit,
  paddingHorizontal: theme.sizing.baseUnit * 2,
}))(View);

const GreyH4 = styled(({ theme }) => ({
  color: theme.colors.text.secondary,
  textAlign: 'right',
}))(H4);

const StyledCardContent = styled(() => ({
  alignItems: 'center',
}))(CardContent);

const StyledBodyText = styled(({ theme }) => ({
  marginTop: theme.sizing.baseUnit * 1.5,
  height: theme.sizing.baseUnit * 15,
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
            <GreyH4>...</GreyH4>
          </ButtonLink>
          <ActionSheet
            ref={(o) => {
              this.ActionSheet = o;
            }}
            title={'Would you like to remove the prayer request?'}
            options={options}
            cancelButtonIndex={cancelIndex}
            destructiveButtonIndex={destructiveIndex}
            onPress={(index) => handleOnPress(index)}
          />
        </EllipsisView>
        <StyledCardContent>
          <Avatar source={imageSource} />
          <H3> Pray For {name}</H3>
          <H6>{source}</H6>
          <StyledBodyText>{text}</StyledBodyText>
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
