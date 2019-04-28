import React from 'react';
import { StyleSheet, View } from 'react-native';
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
import { withNavigation } from 'react-navigation';
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

const StyledCard = styled(() => ({
  marginHorizontal: 0,
  marginVertical: 0,
}))(Card);

const StyledCardContent = styled(() => ({
  alignItems: 'center',
}))(CardContent);

const StyledBodyTextContainer = styled(({ theme }) => ({
  marginTop: theme.sizing.baseUnit * 1.5,
}))(BodyText);

const ButtonView = styled({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
})(View);

const PrayerPreviewCard = withNavigation(
  ({ imageSource, name, overlayColor, prayer, source, navigation, route }) => (
    <>
      <StyledCard>
        <StyledCardContent>
          <Avatar source={imageSource} />
          <H3>Pray For {name}</H3>
          <H6>{source}</H6>
          <StyledBodyTextContainer>
            <BodyText>{prayer}</BodyText>
          </StyledBodyTextContainer>
        </StyledCardContent>
      </StyledCard>
      <Overlay
        colors={getGradientValues(overlayColor).colors}
        start={getGradientValues(overlayColor).start}
        end={getGradientValues(overlayColor).end}
        locations={getGradientValues(overlayColor).locations}
      />
      <PaddedView>
        <PaddedView>
          <ButtonView>
            <Button
              onPress={() => navigation.navigate(route)}
              title="Start Praying"
            />
          </ButtonView>
        </PaddedView>
      </PaddedView>
    </>
  )
);

PrayerPreviewCard.propTypes = {
  imageSource: PropTypes.objectOf(PropTypes.string),
  name: PropTypes.string,
  overlayColor: PropTypes.any, //eslint-disable-line
  prayer: PropTypes.string,
  source: PropTypes.string,
};

export default PrayerPreviewCard;
