import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { styled } from '@apollosproject/ui-kit';
import TileImage from '../../ui/TileImage';

const Square = styled(({ theme }) => ({
  marginRight: theme.sizing.baseUnit * 0.75,
  aspectRatio: 1,
  height: 120,
}))(View);

const PrayerMenuCard = ({ image, link, overlayColor, selected, title }) => {
  // darken the overlay color if the tile is "selected"
  const selectedOverlayColor = ['#1C683E', '#1C683E'];
  const newOverlayColor = selected ? selectedOverlayColor : overlayColor;
  return (
    <Square>
      <TileImage
        image={image}
        isLoading
        link={link}
        overlayColor={newOverlayColor}
        text={title}
      />
    </Square>
  );
};

PrayerMenuCard.propTypes = {
  image: PropTypes.string,
  link: PropTypes.string,
  overlayColor: PropTypes.arrayOf(PropTypes.string),
  selected: PropTypes.bool,
  title: PropTypes.string,
};

export default PrayerMenuCard;
