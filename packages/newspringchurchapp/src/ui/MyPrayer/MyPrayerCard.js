import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import { View } from 'react-native';

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

const StyledCard = styled(({ theme }) => ({
  marginHorizontal: 0,
  marginRight: theme.sizing.baseUnit / 2,
}))(Card);

const MyPrayerCard = enhance(({ duration, text, isLoading, ...otherProps }) => (
  <CardContainer>
    <StyledCard isLoading={isLoading} {...otherProps}>
      <H5>{duration}</H5>
      <CardContent>{text ? <UIText>{text}</UIText> : null}</CardContent>
    </StyledCard>
  </CardContainer>
));

MyPrayerCard.propTypes = {
  duration: PropTypes.string.isRequired,
  text: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default MyPrayerCard;
