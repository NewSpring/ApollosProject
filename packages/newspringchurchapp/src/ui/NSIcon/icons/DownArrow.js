import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Line, Polyline } from 'react-native-svg';

import makeIcon from './makeIcon';

// <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs><style>.a{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.5px;}</style></defs><title>keyboard-arrow-up</title><line class="a" x1="12" y1="23.247" x2="12" y2="0.747"/><polyline class="a" points="8.25 4.497 12 0.747 15.75 4.497"/></svg>

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Line
      class="a"
      x1="12"
      y1="23.247"
      x2="12"
      y2="0.747"
      stroke={fill}
      strokeWidth={2}
    />
    <Polyline
      class="a"
      points="8.25,4.497 12,0.747 15.75,4.497"
      fill={'none'}
      stroke={fill}
      strokeWidth={2}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
