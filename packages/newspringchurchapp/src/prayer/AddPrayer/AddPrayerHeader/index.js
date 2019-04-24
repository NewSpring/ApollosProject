import React, { memo } from 'react';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';

import { Avatar, styled, H3 } from '@apollosproject/ui-kit';

const HeaderContent = styled(() => ({
  alignItems: 'center',
}))(View);

const TitleView = styled(({ theme }) => ({
  marginTop: theme.sizing.baseUnit * 0.5,
  marginBottom: theme.sizing.baseUnit * 2,
}))(View);

const AddPrayerHeader = memo(({ imgSrc, title }) => (
  <HeaderContent>
    <Avatar source={imgSrc} size={'medium'} />
    <TitleView>
      <H3>{title}</H3>
    </TitleView>
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
