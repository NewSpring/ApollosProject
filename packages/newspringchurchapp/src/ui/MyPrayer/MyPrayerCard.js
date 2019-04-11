import React, { memo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  Card,
  styled,
  CardContent,
  H5,
  UIText,
  PaddedView,
} from '@apollosproject/ui-kit';

const PrayerText = styled(() => ({
  textAlign: 'center',
}))(UIText);

const HeaderView = styled(() => ({
  paddingBottom: 0,
}))(PaddedView);

// eslint-disable-next-line react/display-name
const MyPrayerCard = memo(({ duration, text, ...otherProps }) => (
  <Card {...otherProps}>
    <HeaderView>
      <H5>{moment(duration).fromNow()}</H5>
    </HeaderView>
    <CardContent>
      <PrayerText>{text}</PrayerText>
    </CardContent>
  </Card>
));

MyPrayerCard.propTypes = {
  duration: PropTypes.string.isRequired,
  text: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default MyPrayerCard;
