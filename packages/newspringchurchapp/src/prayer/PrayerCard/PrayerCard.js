import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import moment from 'moment';

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
  SideBySideView,
} from '@apollosproject/ui-kit';

const HeaderView = styled(({ theme }) => ({
  paddingBottom: 0,
  paddingTop: theme.sizing.baseUnit * 0.3,
  paddingRight: theme.sizing.baseUnit,
  paddingLeft: theme.sizing.baseUnit,
  height: theme.helpers.verticalRhythm(0.875),
}))(SideBySideView);

const GreyH6 = styled(({ theme }) => ({
  color: theme.colors.text.tertiary,
}))(H6);

const StyledCardContent = styled(() => ({
  alignItems: 'center',
}))(CardContent);

const UserHeader = styled(({ theme }) => ({
  alignItems: 'center',
  marginBottom: theme.sizing.baseUnit * 1.5,
  marginTop: theme.sizing.baseUnit,
}))(View);

const StyledBodyText = styled(() => ({
  textAlign: 'center',
}))(BodyText);

class PrayerCard extends PureComponent {
  handleShowActionSheet = () => {
    this.ActionSheet.show();
  };

  render() {
    const {
      interactive,
      showHelp,
      header,
      avatarSource,
      avatarSize,
      created,
      name,
      campus,
      prayer,
      options,
    } = this.props;

    // add a cancel button
    const buttons = options || [];
    buttons.push({ title: 'Cancel', method: null, destructive: false });

    const handleOnPress = (index) => {
      const buttonMethods = buttons.map((option) => option.method);
      // don't use this if they clicked "cancel"
      if (index === buttonMethods.length - 1) return;
      buttonMethods[index]();
    };

    return (
      <Card>
        {interactive ? (
          <HeaderView>
            <H6>{created ? moment(created).fromNow() : ''}</H6>
            {buttons ? (
              <ButtonLink onPress={this.handleShowActionSheet}>...</ButtonLink>
            ) : null}
            <ActionSheet
              ref={(sheet) => {
                this.ActionSheet = sheet;
              }}
              options={buttons.map((option) => option.title)}
              cancelButtonIndex={buttons.length}
              // this will only make the first option listed as destructive turn red
              // ActionSheet only allows for one destructive button
              destructiveButtonIndex={buttons
                .map((option) => option.destructive)
                .indexOf(true)}
              onPress={(index) => handleOnPress(index)}
            />
          </HeaderView>
        ) : null}
        <StyledCardContent>
          {header ? (
            <UserHeader>
              <Avatar source={avatarSource} size={avatarSize} />
              <H3>Pray For {name}</H3>
              {campus ? <GreyH6>{campus}</GreyH6> : null}
            </UserHeader>
          ) : null}
          <StyledBodyText>{prayer}</StyledBodyText>
          {showHelp ? (
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
  showHelp: PropTypes.bool,
  header: PropTypes.bool,
  avatarSource: PropTypes.shape({ uri: PropTypes.string }),
  avatarSize: PropTypes.string,
  created: PropTypes.string,
  name: PropTypes.string,
  prayer: PropTypes.string,
  campus: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      method: PropTypes.func,
      destructive: PropTypes.bool,
    })
  ),
};

PrayerCard.defaultProps = {
  interactive: true,
  showHelp: true,
  header: true,
  avatarSize: 'small',
  name: 'request',
};

export default PrayerCard;
