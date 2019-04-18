import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import { pure } from 'recompose';
import Color from 'color';
import { ConnectedImage, styled } from '@apollosproject/ui-kit';

const Overlay = styled(StyleSheet.absoluteFillObject)(LinearGradient);

const getGradientValues = (overlayColor) => {
  let colors;
  if (overlayColor.length > 1) {
    colors = [
      `${Color(overlayColor[0])
        .fade(0.2)
        .string()}`,
      `${Color(overlayColor[1])
        .fade(0.2)
        .string()}`,
    ];
  } else {
    colors = [
      `${Color(overlayColor[0])
        .fade(1)
        .string()}`,
      overlayColor[0],
    ];
  }
  const values = {
    colors,
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
    locations: [0.5, 1],
  };

  return values;
};

const Container = styled(({ theme }) => ({
  width: '100%',
  overflow: 'hidden',
  backgroundColor: theme.colors.background.inactive,
}))(View);

const DefaultImageComponent = styled({
  width: '100%',
  resizeMode: 'cover',
})(ConnectedImage);

const NoImagePlaceholder = styled(({ theme }) => ({
  width: '100%',
  aspectRatio: 1,
  backgroundColor: theme.colors.background.inactive,
}))(View);

const GradientOverlayImage = pure(
  ({
    source: imageSource,
    overlayColor,
    ImageComponent: ComponentProp,
    isLoading,
    style,
    imageStyle,
    ...otherProps
  }) => {
    const Component = ComponentProp || DefaultImageComponent;
    return (
      <Container style={style}>
        {imageSource ? (
          <Component
            source={imageSource}
            isLoading={isLoading}
            style={imageStyle}
            {...otherProps}
          />
        ) : (
          <NoImagePlaceholder style={imageStyle} />
        )}
        {overlayColor ? (
          <Overlay
            colors={getGradientValues(overlayColor).colors}
            start={getGradientValues(overlayColor).start}
            end={getGradientValues(overlayColor).end}
            locations={getGradientValues(overlayColor).locations}
          />
        ) : null}
      </Container>
    );
  }
);

const source = PropTypes.oneOfType([
  PropTypes.arrayOf(
    PropTypes.shape({
      uri: PropTypes.string,
      label: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number,
    })
  ),
  PropTypes.string,
]);

GradientOverlayImage.propTypes = {
  source,
  overlayColor: PropTypes.arrayOf(PropTypes.string),
  ImageComponent: PropTypes.func,
  maintainAspectRatio: PropTypes.bool,
};

GradientOverlayImage.defaultProps = {
  maintainAspectRatio: true,
};

export default GradientOverlayImage;
