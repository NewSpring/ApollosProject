import React, { memo } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Color from 'color';
import PropTypes from 'prop-types';
import { H5, styled } from '@apollosproject/ui-kit';

const CardView = styled(({ theme }) => ({
  borderRadius: theme.sizing.baseUnit,
  overflow: 'hidden',
  width: '100%',
  height: '100%',
  aspectRatio: 1.75,
}))(View);

const StyledImage = styled({
  height: '100%',
  width: '100%',
  resizeMode: 'cover',
})(Image);

const TitleView = styled(({ theme }) => ({
  position: 'absolute',
  bottom: theme.sizing.baseUnit,
  left: theme.sizing.baseUnit,
  right: theme.sizing.baseUnit,
  backgroundColor: theme.colors.transparent,
}))(View);

const Title = styled({
  color: 'white',
})(H5);

const Overlay = styled(StyleSheet.absoluteFillObject)(LinearGradient);

const PrayerMenuTileImage = memo(({ image, overlayColor, text }) => (
  <CardView>
    <StyledImage source={{ uri: image }} />
    <Overlay
      colors={[
        `${Color(overlayColor)
          .fade(0.2)
          .string()}`,
        // Android needs two colors 🙄
        `${Color(overlayColor)
          .fade(0.2)
          .string()}`,
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      locations={[0, 1]}
    />
    <TitleView>
      <Title>{text}</Title>
    </TitleView>
  </CardView>
));

PrayerMenuTileImage.propTypes = {
  image: PropTypes.string,
  overlayColor: PropTypes.string,
  text: PropTypes.string,
};

PrayerMenuTileImage.defaultProps = {
  text: '',
};

PrayerMenuTileImage.displayName = 'PrayerMenuTileImage';

export default PrayerMenuTileImage;
