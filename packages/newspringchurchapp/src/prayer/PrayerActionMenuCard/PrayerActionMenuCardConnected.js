import React, { memo } from 'react';
import PropTypes from 'prop-types';

import PrayerActionMenuCard from './PrayerActionMenuCard';

const PrayerActionMenuCardConnected = memo(
  ({ onAdvancePrayer, navigation, ...props }) => {
    const exitPrayer = () => navigation.navigate('Prayer');
    const handlePress = () => {};
    return (
      <PrayerActionMenuCard
        exitPrayer={exitPrayer}
        savePrayer={async () => {
          await handlePress();
        }}
        advancePrayer={onAdvancePrayer}
        {...props}
      />
    );
  }
);

PrayerActionMenuCardConnected.propTypes = {
  onAdvancePrayer: PropTypes.func,
};

export default PrayerActionMenuCardConnected;
