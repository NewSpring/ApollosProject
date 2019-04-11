import React, { memo } from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import { H5, styled, Button, Card, CardContent } from '@apollosproject/ui-kit';
import AddPrayerHeader from '.';

const StyledCardContent = styled(() => ({
  alignItems: 'center',
}))(CardContent);

const Description = styled(({ theme }) => ({
  color: theme.colors.text.secondary,
  marginBottom: theme.sizing.baseUnit,
}))(H5);

const AddPrayerButton = styled(({ theme }) => ({
  marginTop: theme.sizing.baseUnit * 2,
  width: '100%',
}))(Button);

const ButtonLabel = styled(({ theme }) => ({
  color: theme.colors.text.primary,
}))(H5);

const AddPrayer = memo(({ imgSrc, title, description }) => (
  <Card>
    <StyledCardContent>
      <AddPrayerHeader imgSrc={imgSrc} title={title} />
      <Description>{description}</Description>
      <AddPrayerButton>
        <ButtonLabel>Add Your Prayer</ButtonLabel>
      </AddPrayerButton>
    </StyledCardContent>
  </Card>
));

AddPrayer.propTypes = {
  imgSrc: Image.propTypes,
  title: PropTypes.string,
  description: PropTypes.string,
};

AddPrayer.defaultProps = {
  title: 'Ask for prayer',
  description:
    "There aren't currently any prayers in your community. Send them one now.",
};

AddPrayer.displayName = 'AddPrayer';

export default AddPrayer;
