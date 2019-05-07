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

const ExpandedCard = styled(({ expanded, expandedHeight }) => {
  let styles = {};
  styles = expanded
    ? {
        height: expandedHeight,
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

const StyledCardContent = styled(({ theme }) => ({
  alignItems: 'center',
  marginBottom: theme.sizing.baseUnit,
  paddingVertical: 0,
}))(CardContent);

const UserHeader = styled(({ theme }) => ({
  alignItems: 'center',
  marginBottom: theme.sizing.baseUnit * 1.5,
}))(View);

const StyledBodyText = styled(() => ({
  textAlign: 'center',
}))(BodyText);

const StyledAvatarView = styled(({ theme }) => ({
  marginTop: theme.sizing.baseUnit * 1.5,
  marginBottom: theme.sizing.baseUnit * 0.5,
}))(View);

class PrayerCard extends PureComponent {
  static navigationOptions = () => ({
    header: null,
  });

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
      incrementPrayer,
      advancePrayer,
      prayerId,
      navigation,
      anonymous,
    } = this.props;

    const expandedHeight = Dimensions.get('window').height * 0.72;

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
          expandedHeight={expandedHeight}
          navigation={this.props.navigation}
          prayerId={prayerId}
          advancePrayer={advancePrayer}
        />
      </PaddedView>
    ) : (
      <TouchableScale
        onPress={() => {
          if (incrementPrayer) {
            incrementPrayer();
            this.handleCardPressed();
          }
        }}
      >
        <ExpandedCard expandedHeight={expandedHeight} expanded={expanded}>
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
                cancelButtonIndex={buttons.length}
                destructiveButtonIndex={buttons // ActionSheet only allows for one destructive button // this will only make the first option listed as destructive turn red
                  .map((option) => option.destructive)
                  .indexOf(true)}
                onPress={(index) => handleOnPress(index)}
              />
            </HeaderView>
          ) : null}
          <StyledCardContent>
            {header ? (
              <UserHeader>
                {anonymous ? (
                  <>
                    <StyledAvatarView>
                      <Avatar size={avatarSize} />
                    </StyledAvatarView>
                    <H3>Pray For Request</H3>
                  </>
                ) : (
                  <>
                    <StyledAvatarView>
                      <Avatar source={avatarSource} size={avatarSize} />
                    </StyledAvatarView>
                    <H3>Pray For {name}</H3>
                    {source ? <GreyH6>{source}</GreyH6> : null}
                  </>
                )}
              </UserHeader>
            ) : null}
            <StyledBodyText>{prayer}</StyledBodyText>
            {showHelp ? (
              <PaddedView>
                <Touchable
                  onPress={() => {
                    navigation.navigate('ContentSingle', {
                      itemId:
                        'MediaContentItem:b277f039ce974b99753ad8e6805552c2',
                      itemTitle: 'Learning how to pray like Jesus',
                    });
                  }}
                >
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
  actionsEnabled: PropTypes.bool,
  expanded: PropTypes.bool,
  avatarSource: PropTypes.shape({ uri: PropTypes.string }),
  avatarSize: PropTypes.string,
  created: PropTypes.string,
  name: PropTypes.string,
  prayer: PropTypes.string,
  source: PropTypes.string,
  advancePrayer: PropTypes.func,
  incrementPrayer: PropTypes.func,
  prayerId: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      method: PropTypes.func,
      destructive: PropTypes.bool,
    })
  ),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  anonymous: PropTypes.bool,
};

PrayerCard.defaultProps = {
  interactive: true,
  showHelp: true,
  header: true,
  expanded: false,
  avatarSize: 'small',
  name: 'Request',
  source: 'Web',
  anonymous: false,
};

export default PrayerCard;
