import React, { memo } from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import {
  H3,
  H5,
  styled,
  Button,
  Card,
  CardContent,
} from '@apollosproject/ui-kit';

const Title = styled(({ theme }) => ({
  marginBottom: theme.sizing.baseUnit,
  textAlign: 'center',
}))(H3);

const Description = styled(({ theme }) => ({
  color: theme.colors.text.secondary,
  marginBottom: theme.sizing.baseUnit,
  textAlign: 'center',
}))(H5);

const StyledButton = styled(({ theme }) => ({
  marginTop: theme.sizing.baseUnit * 2,
}))(Button);

const ButtonLabel = styled(({ theme }) => ({
  color: theme.colors.text.primary,
}))(H5);

const AddPrayer = memo(({ imgSrc, title, description }) => (
  <Card>
    <CardContent>
      <Image source={imgSrc} />
      <Title>{title}</Title>
      <Description>{description}</Description>
      <StyledButton>
        <ButtonLabel>Add Your Prayer</ButtonLabel>
      </StyledButton>
    </CardContent>
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
