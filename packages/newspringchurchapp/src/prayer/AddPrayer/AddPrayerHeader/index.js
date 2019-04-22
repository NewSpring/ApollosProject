import React, { memo } from 'react';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';

import { Avatar, styled, H3 } from '@apollosproject/ui-kit';

const HeaderContent = styled(() => ({
  alignItems: 'center',
}))(View);

const Title = styled(({ theme }) => ({
  marginTop: theme.sizing.baseUnit * 0.5,
  marginBottom: theme.sizing.baseUnit * 2,
}))(H3);

const AddPrayerHeader = memo(({ imgSrc, title }) => (
  <HeaderContent>
    <Avatar source={imgSrc} size={'medium'} />
    <Title>{title}</Title>
  </HeaderContent>
));

AddPrayerHeader.propTypes = {
  imgSrc: Image.propTypes,
  title: PropTypes.string,
};

AddPrayerHeader.defaultProps = {
  title: 'Ask for prayer',
};

AddPrayerHeader.displayName = 'AddPrayerHeader';

export default AddPrayerHeader;
