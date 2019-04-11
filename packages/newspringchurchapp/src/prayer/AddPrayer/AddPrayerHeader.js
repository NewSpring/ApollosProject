import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Avatar, FlexedView, styled, H3 } from '@apollosproject/ui-kit';

const Title = styled(({ theme }) => ({
  marginTop: theme.sizing.baseUnit * 0.5,
  marginBottom: theme.sizing.baseUnit * 2,
}))(H3);

const AddPrayerHeader = memo(({ imgSrc, title }) => (
  <FlexedView>
    <Avatar source={imgSrc} />
    <Title>{title}</Title>
  </FlexedView>
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
