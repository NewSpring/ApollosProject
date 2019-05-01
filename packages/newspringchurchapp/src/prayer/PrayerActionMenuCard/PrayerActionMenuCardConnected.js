import React from 'react';
import PropTypes from 'prop-types';

import PrayerActionMenuCard from './PrayerActionMenuCard';

const PrayerActionMenuCardConnected = ({ onAdvancePrayer, ...props }) => {
  const exitPrayer = () => props.navigation.navigate('Prayer');
  const handlePress = () => {};
  return (
    <PrayerActionMenuCard
      exitPrayer={exitPrayer}
      savePrayer={async () => {
        await handlePress();
      }}
      advancePrayer={onAdvancePrayer}
    />
  );
};

PrayerActionMenuCardConnected.propTypes = {
  onAdvancePrayer: PropTypes.func,
};

export default PrayerActionMenuCardConnected;
