import React, { memo } from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import {
  BodyText,
  H5,
  styled,
  Button,
  Card,
  CardContent,
} from '@apollosproject/ui-kit';
import AddPrayerHeader from '../AddPrayerHeader';

const StyledCardContent = styled(() => ({
  alignItems: 'center',
}))(CardContent);

const AddPrayerButton = styled(({ theme }) => ({
  marginTop: theme.sizing.baseUnit * 2,
  width: '100%',
}))(Button);

const ButtonLabel = styled(({ theme }) => ({
  color: theme.colors.text.primary,
}))(H5);

const AddPrayerCard = memo(({ imgSrc, description }) => (
  <Card>
    <StyledCardContent>
      <AddPrayerHeader imgSrc={imgSrc} />
      <BodyText>{description}</BodyText>
      <AddPrayerButton>
        <ButtonLabel>Add Your Prayer</ButtonLabel>
      </AddPrayerButton>
    </StyledCardContent>
  </Card>
));

AddPrayerCard.propTypes = {
  imgSrc: Image.propTypes,
  description: PropTypes.string,
};

AddPrayerCard.defaultProps = {
  description:
    "There aren't currently any prayers in your community. Send them one now.",
};

AddPrayerCard.displayName = 'AddPrayerCard';

export default AddPrayerCard;
