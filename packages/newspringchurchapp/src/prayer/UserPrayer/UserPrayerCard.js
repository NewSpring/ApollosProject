import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import ActionSheet from 'react-native-actionsheet';
import {
  Card,
  styled,
  CardContent,
  H5,
  BodyText,
  PaddedView,
  SideBySideView,
  ButtonLink,
} from '@apollosproject/ui-kit';

const PrayerText = styled(() => ({
  textAlign: 'center',
}))(BodyText);

const HeaderView = styled(() => ({
  paddingBottom: 0,
}))(PaddedView);

const HorizontalTextLayout = styled(({ theme }) => ({
  height: theme.helpers.verticalRhythm(0.875),
}))(SideBySideView);

class UserPrayerCard extends PureComponent {
  handleShowActionSheet = () => {
    this.ActionSheet.show();
  };

  render() {
    const cancelIndex = 1;
    const destructiveIndex = 0;
    const { duration, text, id, deletePrayer, ...otherProps } = this.props;
    const handleOnPress = (index) => {
      if (index !== cancelIndex) {
        return deletePrayer(id);
      }
      return index;
    };
    const options = ['Remove Prayer Request', 'Cancel'];
    return (
      <Card {...otherProps}>
        <HeaderView>
          <HorizontalTextLayout>
            <H5>{moment(duration).fromNow()}</H5>
            <ButtonLink onPress={this.handleShowActionSheet}>...</ButtonLink>
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
          </HorizontalTextLayout>
        </HeaderView>
        <CardContent>
          <PrayerText>{text}</PrayerText>
        </CardContent>
      </Card>
    );
  }
}

UserPrayerCard.propTypes = {
  duration: PropTypes.string.isRequired,
  text: PropTypes.string,
  isLoading: PropTypes.bool,
  id: PropTypes.string,
  deletePrayer: PropTypes.func,
};

export default UserPrayerCard;
