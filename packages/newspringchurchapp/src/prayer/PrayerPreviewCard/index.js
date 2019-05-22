import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import Color from 'color';
import { Button, styled, PaddedView } from '@apollosproject/ui-kit';
import { withNavigation } from 'react-navigation';
import PrayerCard from '../PrayerCard';

const Overlay = styled(StyleSheet.absoluteFillObject)(LinearGradient);

const Container = styled({
  justifyContent: 'flex-end',
})(View);

const Preview = styled({
  height: '80%',
  overflow: 'hidden',
})(View);

const PrayerPreviewCard = withNavigation(
  ({ overlayColor, route, ...props }) => {
    const gradients = {
      colors: [
        `${Color(overlayColor)
          .fade(1)
          .string()}`,
        overlayColor,
      ],
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
      locations: [0.1, 1],
    };
    return (
      <Container>
        <Preview>
          <PrayerCard interactive={false} showHelp={false} {...props} />
          <Overlay
            colors={gradients.colors}
            start={gradients.start}
            end={gradients.end}
            locations={gradients.locations}
          />
        </Preview>
        <PaddedView>
          <Button
            onPress={() =>
              props.navigation.navigate('PrayerList', { list: route })
            }
            title="Start Praying"
          />
        </PaddedView>
      </Container>
    );
  }
);

PrayerPreviewCard.propTypes = {
  overlayColor: PropTypes.string,
  route: PropTypes.string,
};

export default PrayerPreviewCard;
