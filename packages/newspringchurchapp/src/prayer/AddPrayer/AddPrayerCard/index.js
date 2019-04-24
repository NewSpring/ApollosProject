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

const AddPrayerCard = memo(({ imgSrc, description, ...props }) => (
  <Card>
    <StyledCardContent>
      <AddPrayerHeader imgSrc={imgSrc} />
      <BodyText>{description}</BodyText>
      <AddPrayerButton
        onPress={() => props.navigation.navigate('AddPrayerForm')}
      >
        <H5>Add Your Prayer</H5>
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
