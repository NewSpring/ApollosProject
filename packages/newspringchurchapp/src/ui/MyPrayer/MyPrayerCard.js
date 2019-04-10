import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
// import { View } from 'react-native';
import moment from 'moment';

import {
  Card,
  withIsLoading,
  styled,
  CardContent,
  H5,
  UIText,
  PaddedView,
} from '@apollosproject/ui-kit';

const enhance = compose(
  withIsLoading,
  pure
);

const PrayerText = styled(() => ({
  textAlign: 'center',
}))(UIText);

const HeaderView = styled(() => ({
  paddingBottom: 0,
}))(PaddedView);

const MyPrayerCard = enhance(({ duration, text, ...otherProps }) => (
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
