import React, { memo } from 'react';
import { Image, Text } from 'react-native';
import PropTypes from 'prop-types';

const AddPrayer = memo(({ imgSrc, title, description }) => (
  <Text>Hello, world!</Text>
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

export default AddPrayer;
