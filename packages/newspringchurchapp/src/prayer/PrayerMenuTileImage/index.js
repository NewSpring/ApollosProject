import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { pure, compose } from 'recompose';
import { H5, styled, withTheme } from '@apollosproject/ui-kit';
import GradientOverlayImage from '../../ui/GradientOverlayImage';

const CardView = styled(
  ({ theme }) => ({
    borderRadius: theme.sizing.baseUnit,
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    aspectRatio: 1.75,
  }),
  'PrayerMenuTileImage'
)(View);

const Title = styled(
  ({ theme }) => ({
    position: 'absolute',
    bottom: theme.sizing.baseUnit,
    left: theme.sizing.baseUnit,
    right: theme.sizing.baseUnit,
    backgroundColor: theme.colors.transparent,
    color: theme.colors.lightPrimary,
  }),
  'PrayerMenuTileImage.Text'
)(H5);

const SquareGradientOverlayImage = styled({
  aspectRatio: 1,
})(GradientOverlayImage);

const enhance = compose(
  withTheme(({ theme: { colors } = {} } = {}) => ({ theme: { colors } })),
  pure
);

const PrayerMenuTileImage = enhance(
  ({ image, isLoading, overlayColor, text }) => (
    <CardView>
      <SquareGradientOverlayImage
        source={image}
        isLoading={isLoading}
        maintainAspectRatio={false}
        overlayColor={overlayColor || null}
      />
      <Title>{text}</Title>
    </CardView>
  )
);

PrayerMenuTileImage.propTypes = {
  image: GradientOverlayImage.propTypes.source,
  isLoading: PropTypes.bool,
  link: PropTypes.string,
  onPressItem: PropTypes.func,
  overlayColor: PropTypes.arrayOf(PropTypes.string),
  text: PropTypes.string,
};

PrayerMenuTileImage.defaultProps = {
  text: '',
};

export default PrayerMenuTileImage;
