import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import Color from 'color';
import {
  Avatar,
  BodyText,
  Button,
  Card,
  CardContent,
  H3,
  H6,
  PaddedView,
  styled,
} from '@apollosproject/ui-kit';

// TODO: Borrowed `Overlay` and `getGradientValues` from <GradientOverlayImage />
// We should probably extract these to someplace else and import them in both places.
const Overlay = styled(StyleSheet.absoluteFillObject)(LinearGradient);

const getGradientValues = (overlayColor) => {
  let colors;
  if (overlayColor.length > 1) {
    colors = [
      `${Color(overlayColor[0])
        .fade(0.6)
        .string()}`,
      `${Color(overlayColor[1])
        .fade(0)
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
    locations: [0.25, 0.75],
  };

  return values;
};

const StyledCardContent = styled(() => ({
  alignItems: 'center',
}))(CardContent);

const StyledBodyText = styled(({ theme }) => ({
  marginTop: theme.sizing.baseUnit * 1.5,
}))(BodyText);

const BottomButton = styled({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
})(Button);

const PrayerPreviewCard = ({
  imageSource,
  name,
  overlayColor,
  prayer,
  source,
}) => (
  <>
    <Card>
      <PaddedView>
        <StyledCardContent>
          <Avatar source={imageSource} />
          <H3>Pray For {name}</H3>
          <H6>{source}</H6>
          <StyledBodyText>{prayer}</StyledBodyText>
        </StyledCardContent>
      </PaddedView>
    </Card>
    <Overlay
      colors={getGradientValues(overlayColor).colors}
      start={getGradientValues(overlayColor).start}
      end={getGradientValues(overlayColor).end}
      locations={getGradientValues(overlayColor).locations}
    />
    <PaddedView>
      <PaddedView>
        <BottomButton onPress={() => {}} title="Start Praying" />
      </PaddedView>
    </PaddedView>
  </>
);

PrayerPreviewCard.propTypes = {
  imageSource: PropTypes.objectOf(PropTypes.string),
  name: PropTypes.string,
  overlayColor: PropTypes.any, //eslint-disable-line
  prayer: PropTypes.string,
  source: PropTypes.string,
};

export default PrayerPreviewCard;
