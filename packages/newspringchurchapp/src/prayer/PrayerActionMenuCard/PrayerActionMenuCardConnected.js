import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import savePrayerRequest from '../data/mutations/savePrayerRequest';
import savedPrayerList from '../data/queries/getSavedPrayers';
import PrayerActionMenuCard from './PrayerActionMenuCard';

const PrayerActionMenuCardConnected = memo(
  ({ onAdvancePrayer, navigation, prayerId, prayerRequest, ...props }) => {
    const exitPrayer = () => navigation.navigate('Prayer');
    return (
      <Mutation
        mutation={savePrayerRequest}
        update={async (cache) => {
          const currentSavedPrayers = cache.readQuery({
            query: savedPrayerList,
          });
          const newPrayersList = currentSavedPrayers.savedPrayers;
          newPrayersList.push(prayerRequest.prayer);
          await cache.writeQuery({
            query: savedPrayerList,
            data: { savedPrayers: newPrayersList },
          });
        }}
      >
        {(savePrayer) => (
          <PrayerActionMenuCard
            exitPrayer={exitPrayer}
            savePrayer={async () => {
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
  prayerRequest: PropTypes.shape({}),
};

export default PrayerActionMenuCardConnected;
