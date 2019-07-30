import React from 'react';
import { View } from 'react-native';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { styled, withTheme } from '@apollosproject/ui-kit';
import PrayerMenuTileImage from '../PrayerMenuTileImage';

const enhance = compose(withTheme());

const Tile = styled(({ theme, selected }) => ({
  marginRight: theme.sizing.baseUnit * 0.25,
  marginTop: theme.sizing.baseUnit * 0.5,
  marginBottom: theme.sizing.baseUnit * 0.5,
  height: theme.sizing.baseUnit * 6,
  transform: selected
    ? [{ scaleX: 1 }, { scaleY: 1.1 }]
    : [{ scaleX: 0.95 }, { scaleY: 1 }],
}))(View);

const PrayerMenuCard = enhance(({ image, selected, title, theme }) => (
  <Tile selected={selected}>
    <PrayerMenuTileImage
      image={image}
      overlayColor={theme.colors.primary}
      text={title}
    />
  </Tile>
));

PrayerMenuCard.propTypes = {
  image: PropTypes.string,
  selected: PropTypes.bool,
  title: PropTypes.string,
};

export default PrayerMenuCard;
