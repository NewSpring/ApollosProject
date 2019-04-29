import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Color from 'color';
import { styled } from '@apollosproject/ui-kit';
import TileImage from '../../ui/TileImage';

const Square = styled(({ theme, ...props }) => ({
  marginRight: theme.sizing.baseUnit * 0.75,
  marginTop: theme.sizing.baseUnit * 0.5,
  marginBottom: theme.sizing.baseUnit * 0.5,
  height: 120,
  transform: props.transform,
}))(View);

const PrayerMenuCard = ({ image, link, overlayColor, selected, title }) => {
  // darken the overlay color if the tile is "selected"
  const newOverlayColor = !selected
    ? overlayColor.map((color) =>
        Color(color)
          .lighten(0.4)
          .hex()
      )
    : overlayColor;
  const newTransform = selected
    ? [{ scaleX: 1 }, { scaleY: 1.1 }]
    : [{ scaleX: 0.95 }, { scaleY: 1 }];

  return (
    <Square transform={newTransform}>
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
