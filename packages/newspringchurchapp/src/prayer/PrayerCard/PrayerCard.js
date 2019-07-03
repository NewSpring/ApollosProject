import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import moment from 'moment';
import ActionSheet from 'react-native-actionsheet';
import {
  BodyText,
  Card,
  CardContent,
  H5,
  PaddedView,
  styled,
  Touchable,
  ChannelLabel,
} from '@apollosproject/ui-kit';
import PrayerHeader from '../PrayerHeader';

const HeaderView = styled(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'row',
  alignItems: 'flex-end',
  marginHorizontal: theme.sizing.baseUnit,
  marginTop: theme.sizing.baseUnit * 0.5,
}))(View);

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

  handleShowActionSheet = () => {
    this.ActionSheet.show();
  };

  render() {
    const {
      interactive,
      showHelp,
      header,
      avatarSize,
      created,
      prayer,
      options,
      incrementPrayer, // TODO: use this function to increment prayer
      advancePrayer, // TODO: use this function to go to next prayer
      navigation,
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
            <GreyH5>{created ? moment(created).fromNow() : ''}</GreyH5>
          </HeaderView>
        ) : null}
        <StyledCardContent>
          {header ? (
            <StyledPrayerHeaderView>
              <PrayerHeader
                anonymous={prayer.isAnonymous}
                avatarSize={avatarSize}
                avatarSource={prayer.person.photo}
                name={`Pray For ${prayer.firstName}`}
                source={prayer.campus.name}
              />
            </StyledPrayerHeaderView>
          ) : null}
          <StyledBodyText>{prayer.text}</StyledBodyText>
          {showHelp ? (
            <StyledTouchable
              onPress={() => {
                navigation.navigate('ContentSingle', {
                  // TODO: this should come from a content channel
                  itemId: 'MediaContentItem:20f5b6548d64b1ac62a1c4b0deb0bfcb',
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
        {/* TODO: use this to delete the prayer with onPress=handleActionSheet */}
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
      </Card>
    );
  }
}

PrayerCard.propTypes = {
  interactive: PropTypes.bool,
  showHelp: PropTypes.bool,
  header: PropTypes.bool,
  avatarSize: PropTypes.string,
  prayer: PropTypes.shape({}), // TODO: fill this out
  advancePrayer: PropTypes.func,
  incrementPrayer: PropTypes.func,
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
  prayer: {
    firstName: 'Request',
    campus: { name: 'Web' },
    isAnonymous: false,
    person: { photo: { uri: '' } },
  },
};

export default PrayerCard;
