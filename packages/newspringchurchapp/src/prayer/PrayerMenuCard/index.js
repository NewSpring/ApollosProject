import React from 'react';
import { View } from 'react-native';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import Color from 'color';
import { styled, withTheme } from '@apollosproject/ui-kit';
import TileImage from '../../ui/TileImage';

const enhance = compose(withTheme());

const Square = styled(({ theme, ...props }) => ({
  marginRight: theme.sizing.baseUnit * 0.25,
  marginTop: theme.sizing.baseUnit * 0.5,
  marginBottom: theme.sizing.baseUnit * 0.5,
  height: 90,
  transform: props.transform,
}))(View);

const PrayerMenuCard = enhance(
  ({ image, link, overlayColor, selected, title, theme }) => {
    // lighten the overlay color if the tile is "selected"
    const selectedOverlayColor = [theme.colors.primary, theme.colors.primary];
    const newOverlayColor = selected ? selectedOverlayColor : overlayColor;
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
  }
);

PrayerMenuCard.propTypes = {
  image: PropTypes.string,
  link: PropTypes.string,
  overlayColor: PropTypes.arrayOf(PropTypes.string),
  selected: PropTypes.bool,
  title: PropTypes.string,
};

PrayerMenuCard.defaultProps = {
  overlayColor: ['#fff', '#fff'],
};

export default PrayerMenuCard;
