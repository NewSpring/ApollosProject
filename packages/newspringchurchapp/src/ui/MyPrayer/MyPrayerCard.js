import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import { View } from 'react-native';
import moment from 'moment';

import {
  Card,
  withIsLoading,
  styled,
  CardContent,
  H5,
  UIText,
} from '@apollosproject/ui-kit';

const enhance = compose(
  withIsLoading,
  pure
);
const CardContainer = styled(({ theme }) => ({
  height: theme.sizing.baseUnit * 6,
}))(View);

const MyPrayerCard = enhance(({ duration, text, isLoading, ...otherProps }) => (
  <CardContainer>
    <Card isLoading={isLoading} {...otherProps}>
      <H5>{moment(duration).fromNow()}</H5>
      <CardContent>{text ? <UIText>{text}</UIText> : null}</CardContent>
    </Card>
  </CardContainer>
));

MyPrayerCard.propTypes = {
  duration: PropTypes.string.isRequired,
  text: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default MyPrayerCard;
