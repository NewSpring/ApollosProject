import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions } from 'react-native';
import moment from 'moment';
import Config from 'react-native-config';
import ActionSheet from 'react-native-actionsheet';
import {
  BodyText,
  Card,
  CardContent,
  H3,
  H5,
  PaddedView,
  styled,
  Touchable,
  TouchableScale,
  ButtonLink,
  ChannelLabel,
} from '@apollosproject/ui-kit';
import PrayerActionMenuCardConnected from '../PrayerActionMenuCard/PrayerActionMenuCardConnected';
import PrayerHeader from '../PrayerHeader';

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

const StyledCardContent = styled(({ theme }) => ({
  alignItems: 'center',
  marginBottom: theme.sizing.baseUnit,
}))(CardContent);

const StyledBodyText = styled(() => ({
  textAlign: 'center',
}))(BodyText);

const StyledPrayerHeaderView = styled(({ theme }) => ({
  marginBottom: theme.sizing.baseUnit * 1.5,
  marginTop: theme.sizing.baseUnit * 0.5,
}))(View);

const StyledTouchable = styled({
  zIndex: 2,
})(Touchable);

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
      navigation,
      anonymous,
      prayerRequest,
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
          advancePrayer={advancePrayer}
          prayerRequest={prayerRequest}
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
                cancelButtonIndex={buttons.length - 1}
                destructiveButtonIndex={buttons // ActionSheet only allows for one destructive button // this will only make the first option listed as destructive turn red
                  .map((option) => option.destructive)
                  .indexOf(true)}
                onPress={(index) => handleOnPress(index)}
              />
            </HeaderView>
          ) : null}
          <StyledCardContent>
            {header ? (
              <StyledPrayerHeaderView>
                <PrayerHeader
                  anonymous={anonymous}
                  avatarSize={avatarSize}
                  avatarSource={avatarSource}
                  name={`Pray For ${name}`}
                  source={source}
                />
              </StyledPrayerHeaderView>
            ) : null}
            <StyledBodyText>{prayer}</StyledBodyText>
            {showHelp ? (
              <StyledTouchable
                onPress={() => {
                  navigation.navigate('ContentSingle', {
                    itemId: Config.PRAYER_CONTENT_ID,
                    itemTitle: 'Learning how to pray like Jesus',
                    isolated: true,
                  });
                }}
              >
                <PaddedView>
                  <ChannelLabel icon="information" label="How to Pray?" />
                </PaddedView>
              </StyledTouchable>
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
  prayerRequest: PropTypes.shape({}),
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
