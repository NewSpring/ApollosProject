import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  BodyText,
  H5,
  styled,
  Touchable,
  ChannelLabel,
  SideBySideView,
} from '@apollosproject/ui-kit';
import PrayerHeader from '../PrayerHeader';

const GreyH5 = styled(({ theme }) => ({
  color: theme.colors.text.tertiary,
  marginBottom: theme.sizing.baseUnit * 0.5,
}))(H5);

const PrayerText = styled(({ theme }) => ({
  marginVertical: theme.sizing.baseUnit,
}))(BodyText);

class PrayerSingle extends PureComponent {
  static navigationOptions = () => ({
    header: null,
  });

  render() {
    const {
      showHelp,
      showHeader,
      showDate,
      avatarSize,
      prayer,
      action,
      navigation,
    } = this.props;

    return (
      <View>
        {showDate? 
        <GreyH5>
          {prayer.enteredDateTime
            ? moment(prayer.enteredDateTime).fromNow()
            : ''}
        </GreyH5>
            :null}
        <SideBySideView>
          {showHeader ? (
            <PrayerHeader
              avatarSize={avatarSize}
              avatarSource={prayer.isAnonymous ? null : prayer.person.photo}
              title={`Pray for ${
                prayer.isAnonymous ? 'Request' : prayer.firstName
              }`}
              source={prayer.campus.name}
            />
          ) : null}
          {action}
        </SideBySideView>
        <PrayerText>{prayer.text}</PrayerText>
        {showHelp ? (
          <Touchable
            onPress={() => {
              navigation.navigate('ContentSingle', {
                // TODO: this should come from a content channel
                itemId: 'MediaContentItem:20f5b6548d64b1ac62a1c4b0deb0bfcb',
                itemTitle: 'Learning how to pray like Jesus',
                isolated: true,
              });
            }}
          >
            <ChannelLabel icon="information" label="How to Pray?" />
          </Touchable>
        ) : null}
      </View>
    );
  }
}

PrayerSingle.propTypes = {
  showHelp: PropTypes.bool,
  showHeader: PropTypes.bool,
  showDate: PropTypes.bool,
  avatarSize: PropTypes.string,
  prayer: PropTypes.shape({}), // TODO: fill this out
  action: PropTypes.func,
};

PrayerSingle.defaultProps = {
  showHelp: false,
  showHeader: false,
  showDate: false,
  avatarSize: 'small',
  prayer: {
    firstName: 'Request',
    campus: { name: 'Web' },
    isAnonymous: false,
    person: { photo: { uri: '' } },
  },
  action: null,
};

export default PrayerSingle;
