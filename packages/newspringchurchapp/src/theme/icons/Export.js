import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';
import { makeIcon } from '@apollosproject/ui-kit';

const Icon = makeIcon(({ size, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 575.95 512" {...otherProps}>
    <Path
      d="M384 121.9c0-6.3-2.5-12.4-7-16.9L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128zM571 308l-95.7-96.4c-10.1-10.1-27.4-3-27.4 11.3V288h-64v64h64v65.2c0 14.3 17.3 21.4 27.4 11.3L571 332c6.6-6.6 6.6-17.4 0-24zm-379 28v-32c0-8.8 7.2-16 16-16h176V160H248c-13.2 0-24-10.8-24-24V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V352H208c-8.8 0-16-7.2-16-16z"
      // fill={'none'}
      // stroke={fill}
      // strokeWidth={2}
      // strokeLinecap={'round'}
      // strokeLinejoin={'round'}
    />
  </Svg>
));

// <svg xmlns="http://www.w3.org/2000/svg" width="575.95" height="512" viewBox="0 0 575.95 512"><path d="M384,121.9a23.923,23.923,0,0,0-7-16.9L279.1,7a23.982,23.982,0,0,0-17-7H256V128H384ZM571,308l-95.7-96.4c-10.1-10.1-27.4-3-27.4,11.3V288h-64v64h64v65.2c0,14.3,17.3,21.4,27.4,11.3L571,332A17.02,17.02,0,0,0,571,308ZM192,336V304a16.047,16.047,0,0,1,16-16H384V160H248a24.071,24.071,0,0,1-24-24V0H24A23.942,23.942,0,0,0,0,24V488a23.942,23.942,0,0,0,24,24H360a23.942,23.942,0,0,0,24-24V352H208A16.047,16.047,0,0,1,192,336Z"/></svg>

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
