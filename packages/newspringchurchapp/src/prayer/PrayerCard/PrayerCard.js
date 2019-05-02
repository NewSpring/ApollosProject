import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions } from 'react-native';
import moment from 'moment';

import ActionSheet from 'react-native-actionsheet';
import {
  Avatar,
  BodyText,
  Card,
  CardContent,
  H3,
  H5,
  H6,
  PaddedView,
  styled,
  Touchable,
  TouchableScale,
  ButtonLink,
  ChannelLabel,
} from '@apollosproject/ui-kit';
import PrayerActionMenuCardConnected from '../PrayerActionMenuCard/PrayerActionMenuCardConnected';

const ExpandedCard = styled(({ expanded }) => {
  let styles = {};
  styles = expanded
    ? {
        height: Dimensions.get('window').height * 0.72,
      }
    : {};
  return styles;
})(Card);

const HeaderView = styled(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'row',
  alignItems: 'flex-end',
  marginHorizontal: theme.sizing.baseUnit,
  marginTop: theme.sizing.baseUnit * 0.5,
}))(View);

const GreyH3 = styled(({ theme }) => ({
  color: theme.colors.lightTertiary,
}))(H3);

const GreyH5 = styled(({ theme }) => ({
  color: theme.colors.text.tertiary,
}))(H5);

const GreyH6 = styled(({ theme }) => ({
  color: theme.colors.text.tertiary,
}))(H6);

const StyledCardContent = styled(() => ({
  alignItems: 'center',
}))(CardContent);

const UserHeader = styled(({ theme }) => ({
  alignItems: 'center',
  marginBottom: theme.sizing.baseUnit * 1.5,
}))(View);

const StyledBodyText = styled(() => ({
  textAlign: 'center',
}))(BodyText);

class PrayerCard extends PureComponent {
  state = {
    cardPressed: false,
  };

  handleShowActionSheet = () => {
    this.ActionSheet.show();
  };

  handleCardPressed = () => this.setState({ cardPressed: true });

  render() {
    const {
      interactive,
      actionsEnabled,
      showHelp,
      header,
      expanded,
      avatarSource,
      avatarSize,
      created,
      name,
      source,
      prayer,
      options,
      advancePrayer,
      prayerId,
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

    return actionsEnabled && this.state.cardPressed ? (
      <PaddedView>
        <PrayerActionMenuCardConnected
          navigation={this.props.navigation}
          prayerId={prayerId}
          advancePrayer={advancePrayer}
        />
      </PaddedView>
    ) : (
      <TouchableScale onPress={this.handleCardPressed}>
        <ExpandedCard expanded={expanded}>
          {interactive ? (
            <HeaderView>
              <GreyH5>{created ? moment(created).fromNow() : ''}</GreyH5>
              {buttons ? (
                <ButtonLink onPress={this.handleShowActionSheet}>
                  <GreyH3>...</GreyH3>
                </ButtonLink>
              ) : null}
              <ActionSheet
                ref={(sheet) => {
                  this.ActionSheet = sheet;
                }}
                options={buttons.map((option) => option.title)}
                cancelButtonIndex={buttons.length} // ActionSheet only allows for one destructive button // this will only make the first option listed as destructive turn red
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
                {source ? <GreyH6>{source}</GreyH6> : null}
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
        </ExpandedCard>
      </TouchableScale>
    );
  }
}

PrayerCard.propTypes = {
  interactive: PropTypes.bool,
  showHelp: PropTypes.bool,
  header: PropTypes.bool,
  navigation: PropTypes.shape({}),
  actionsEnabled: PropTypes.bool,
  expanded: PropTypes.bool,
  avatarSource: PropTypes.shape({ uri: PropTypes.string }),
  avatarSize: PropTypes.string,
  created: PropTypes.string,
  name: PropTypes.string,
  prayer: PropTypes.string,
  source: PropTypes.string,
  advancePrayer: PropTypes.func,
  prayerId: PropTypes.string,
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
  expanded: false,
  avatarSize: 'small',
  name: 'Request',
  source: 'Web',
};

export default PrayerCard;
