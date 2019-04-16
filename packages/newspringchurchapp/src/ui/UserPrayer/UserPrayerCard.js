import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import ActionSheet from 'react-native-actionsheet';

import {
  Card,
  styled,
  CardContent,
  H5,
  UIText,
  PaddedView,
  SideBySideView,
  ButtonLink,
} from '@apollosproject/ui-kit';

const PrayerText = styled(() => ({
  textAlign: 'center',
}))(UIText);

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
    const { duration, text, ...otherProps } = this.props;

    const options = ['Remove Prayer Request', 'Cancel'];
    return (
      <Card {...otherProps}>
        <HeaderView>
          <HorizontalTextLayout>
            <H5>{moment(duration).fromNow()}</H5>
            <ButtonLink onPress={this.handleShowActionSheet}>Menu</ButtonLink>
            <ActionSheet
              ref={(o) => {
                this.ActionSheet = o;
              }}
              title={'Would you like to remove the prayer request?'}
              options={options}
              cancelButtonIndex={1}
              destructiveButtonindex={0}
              onPress={() => console.warn('you pressed the button')}
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
};

export default UserPrayerCard;
