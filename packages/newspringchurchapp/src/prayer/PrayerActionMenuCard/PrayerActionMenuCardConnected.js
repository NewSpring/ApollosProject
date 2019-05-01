import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import PrayerActionMenuCard from './PrayerActionMenuCard';

const PrayerActionMenuCardConnected = ({ advancePrayer, ...props }) => {
  const exitPrayer = () => props.navigation.navigate('Prayer');
  return (
    <Mutation>
      {(handlePress) => (
        <PrayerActionMenuCard
          exitPrayer={exitPrayer}
          savePrayer={async () => {
            await handlePress();
          }}
          advancePrayer={advancePrayer}
        />
      )}
    </Mutation>
  );
};

PrayerActionMenuCardConnected.propTypes = {
  advancePrayer: PropTypes.func,
};

export default PrayerActionMenuCardConnected;
