import React, { memo } from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import { H2, H5, FlexedView, styled } from '@apollosproject/ui-kit';

const Content = styled({
  justifyContent: 'center',
})(FlexedView);

const Title = styled(({ theme }) => ({
  color: theme.colors.primary,
  marginBottom: theme.sizing.baseUnit * 0.5,
}))(H2);

const Description = styled(({ theme }) => ({
  color: theme.colors.text.secondary,
  marginBottom: theme.sizing.baseUnit,
}))(H5);

const AddPrayer = memo(({ imgSrc, title, description }) => (
  <Content>
    <Image source={imgSrc} />
    <Title>{title}</Title>
    <Description>{description}</Description>
  </Content>
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
