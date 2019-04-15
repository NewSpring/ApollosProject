import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from '@apollosproject/ui-kit';
import NSIcon from '../ui/NSIcon';

const tabBarIcon = (name) => {
  function TabBarIcon({ tintColor }) {
    return <Icon name={name} fill={tintColor} size={24} />;
  }
  TabBarIcon.propTypes = {
    tintColor: PropTypes.string,
  };
  return TabBarIcon;
};

export const tabBarIconNewSpring = (name) => {
  function NewSpringTabBarIcon({ tintColor }) {
    return <NSIcon name={name} fill={tintColor} size={24} />;
  }
  NewSpringTabBarIcon.propTypes = {
    tintColor: PropTypes.string,
  };
  return NewSpringTabBarIcon;
};

export default tabBarIcon;
