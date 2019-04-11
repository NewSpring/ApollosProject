import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { pure, compose } from 'recompose';
import { H5, styled, TouchableScale, withTheme } from '@apollosproject/ui-kit';
import GradientOverlayImage from '../GradientOverlayImage';

const CardView = styled(
  ({ theme }) => ({
    borderRadius: theme.sizing.baseUnit,
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    aspectRatio: 1,
  }),
  'TileImage'
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
  'TileImage.Text'
)(H5);

const SquareGradientOverlayImage = styled({
  aspectRatio: 1,
})(GradientOverlayImage);

const enhance = compose(
  withTheme(({ theme: { colors } = {} } = {}) => ({ theme: { colors } })),
  pure
);

const TileImage = enhance(
  ({ image, isLoading, link, onPressItem, overlayColor, text }) => (
    <TouchableScale onPress={() => !isLoading && onPressItem({ ...link })}>
      <CardView>
        <SquareGradientOverlayImage
          source={image}
          isLoading={isLoading}
          maintainAspectRatio={false}
          overlayColor={overlayColor || null}
        />
        <Title>{text}</Title>
      </CardView>
    </TouchableScale>
  )
);

TileImage.propTypes = {
  image: GradientOverlayImage.propTypes.source,
  isLoading: PropTypes.bool,
  link: PropTypes.string,
  onPressItem: PropTypes.func,
  overlayColor: PropTypes.arrayOf(PropTypes.string),
  text: PropTypes.string,
};

TileImage.defaultProps = {
  text: '',
};

export default TileImage;
