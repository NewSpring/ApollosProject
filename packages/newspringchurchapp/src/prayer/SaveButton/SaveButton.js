import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

const SaveButton = memo(({ saved }) => <Text>hello</Text>);

SaveButton.propTypes = {
  saved: PropTypes.bool,
};

SaveButton.displayName = 'SaveButton';

export default SaveButton;
