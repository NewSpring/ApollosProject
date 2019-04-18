import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { styled } from '@apollosproject/ui-kit';
import TileImage from '../TileImage';

const Square = styled(({ theme }) => ({
  marginRight: theme.sizing.baseUnit * 0.75,
  aspectRatio: 1,
  height: 120,
}))(View);

const PrayerMenuCard = ({ image, link, overlayColor, title }) => (
  <Square>
    <TileImage
      image={image}
      isLoading
      link={link}
      overlayColor={overlayColor}
      text={title}
    />
  </Square>
);

PrayerMenuCard.propTypes = {
  image: PropTypes.string,
  link: PropTypes.string,
  overlayColor: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
};

export default PrayerMenuCard;
