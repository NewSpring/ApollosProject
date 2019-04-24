import React from 'react';
import PropTypes from 'prop-types';
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
  Chip,
} from '@apollosproject/ui-kit';

const StyledCard = styled(() => ({
  marginHorizontal: 0,
  marginVertical: 0,
}))(Card);

const StyledCardContent = styled(() => ({
  alignItems: 'center',
}))(CardContent);

const StyledBodyText = styled(({ theme }) => ({
  marginTop: theme.sizing.baseUnit * 1.5,
}))(BodyText);

const PrayerCard = ({ imageSource, name, prayer, source }) => (
  <>
    <StyledCard>
      <StyledCardContent>
        <Avatar source={imageSource} />
        <H3>Pray For {name}</H3>
        <H6>{source}</H6>
        <StyledBodyText>{prayer}</StyledBodyText>
        <Chip title="How to Pray?" onPress={() => {}} />
        <PaddedView>
          <Button onPress={() => {}} title={`Start Praying for ${name}`} />
        </PaddedView>
      </StyledCardContent>
    </StyledCard>
  </>
);

PrayerCard.propTypes = {
  imageSource: PropTypes.objectOf(PropTypes.string),
  name: PropTypes.string,
  prayer: PropTypes.string,
  source: PropTypes.string,
};

export default PrayerCard;
