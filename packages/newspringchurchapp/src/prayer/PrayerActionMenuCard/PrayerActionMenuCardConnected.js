import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import savePrayerRequest from '../data/mutations/savePrayerRequest';
import PrayerActionMenuCard from './PrayerActionMenuCard';

const PrayerActionMenuCardConnected = memo(
  ({ onAdvancePrayer, navigation, id, ...props }) => {
    const exitPrayer = () => navigation.navigate('Prayer');
    return (
      <Mutation mutation={savePrayerRequest}>
        {(savePrayer) => (
          <PrayerActionMenuCard
            exitPrayer={exitPrayer}
            savePrayer={async () => {
              await savePrayer({
                variables: {
                  nodeId: id,
                },
              });
            }}
            advancePrayer={onAdvancePrayer}
            {...props}
          />
        )}
      </Mutation>
    );
  }
);

PrayerActionMenuCardConnected.propTypes = {
  onAdvancePrayer: PropTypes.func,
  id: PropTypes.string,
};

export default PrayerActionMenuCardConnected;
