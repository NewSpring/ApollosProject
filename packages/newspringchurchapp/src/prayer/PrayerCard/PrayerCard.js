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

const StyledBodyText = styled(() => ({
  textAlign: 'center',
}))(BodyText);

const BodyTextView = styled(({ theme }) => ({
  marginTop: theme.sizing.baseUnit * 1.5,
  alignItems: 'center',
}))(View);

class PrayerCard extends PureComponent {
  handleShowActionSheet = () => {
    this.ActionSheet.show();
  };

  render() {
    const {
      interactive,
      avatarSource,
      avatarSize,
      name,
      campus,
      prayer,
      prayerID,
    } = this.props;

    const options = [
      {
        title: 'Flag',
        method: (arg) => arg,
        destructive: false,
      },
      {
        title: 'Save',
        method: () => 'savePrayer',
        destructive: false,
      },
      { title: 'Cancel', method: null, destructive: false },
    ];
    const handleOnPress = (index) => {
      const methods = options.map((option) => option.method);
      // this will only work for methods that take the prayer id as the first and only argument
      methods[index](prayerID);
      // TODO: is this needed?
      return index;
    };
    return (
      <Card>
        {interactive ? (
          <EllipsisView>
            <ButtonLink onPress={this.handleShowActionSheet}>
              <GreyH3>...</GreyH3>
            </ButtonLink>
            <ActionSheet
              ref={(sheet) => {
                this.ActionSheet = sheet;
              }}
              options={options.map((option) => option.title)}
              cancelButtonIndex={options.length}
              // this will only make the first option listed as destructive turn red
              // ActionSheet only allows for one destructive button
              destructiveButtonIndex={options
                .map((option) => option.destructive)
                .indexOf(true)}
              onPress={(index) => handleOnPress(index)}
            />
          </EllipsisView>
        ) : null}
        <StyledCardContent>
          <Avatar source={avatarSource} size={avatarSize} />
          <H3>Pray For {name}</H3>
          {campus ? <GreyH6>{campus}</GreyH6> : null}
          <BodyTextView>
            <StyledBodyText>{prayer}</StyledBodyText>
          </BodyTextView>
          {interactive ? (
            <PaddedView>
              <Touchable onPress={() => {}}>
                <ChannelLabel icon="information" label="How to Pray?" />
              </Touchable>
            </PaddedView>
          ) : null}
        </StyledCardContent>
      </Card>
    );
  }
}

PrayerCard.propTypes = {
  interactive: PropTypes.bool,
  avatarSource: PropTypes.shape({ uri: PropTypes.string }),
  avatarSize: PropTypes.string,
  name: PropTypes.string,
  prayer: PropTypes.string,
  campus: PropTypes.string,
  prayerID: PropTypes.string,
};

PrayerCard.defaultProps = {
  interactive: true,
  avatarSize: 'small',
  name: 'request',
};

export default PrayerCard;
