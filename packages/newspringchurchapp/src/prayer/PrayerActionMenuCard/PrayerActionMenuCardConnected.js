import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import savePrayerRequest from '../data/mutations/savePrayerRequest';
import PrayerActionMenuCard from './PrayerActionMenuCard';

const PrayerActionMenuCardConnected = memo(
  ({ onAdvancePrayer, navigation, prayerId, ...props }) => {
    const exitPrayer = () => navigation.navigate('Prayer');
    return (
      <Mutation mutation={savePrayerRequest}>
        {(savePrayer) => (
          <PrayerActionMenuCard
            exitPrayer={exitPrayer}
            savePrayerId={async () => {
              await savePrayer({
                variables: {
                  nodeId: prayerId,
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
  prayerId: PropTypes.string,
};

export default PrayerActionMenuCardConnected;
