import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import savePrayerRequest from '../data/mutations/savePrayerRequest';
import savedPrayerList from '../data/queries/getSavedPrayers';
import getPrayerRequestById from '../data/queries/getPrayerRequestById';
import PrayerActionMenuCard from './PrayerActionMenuCard';

const PrayerActionMenuCardConnected = memo(
  ({ onAdvancePrayer, navigation, prayerId, ...props }) => {
    const exitPrayer = () => navigation.navigate('Prayer');
    return (
      <Mutation
        mutation={savePrayerRequest}
        update={async (cache, { data: { savePrayer: returnedPrayer } }) => {
          console.log('data', returnedPrayer);
          const currentSavedPrayers = cache.readQuery({
            query: savedPrayerList,
          });
          console.log('currentSavedPrayers', currentSavedPrayers);
          const { id } = returnedPrayer;
          // const newSavedPrayer = cache.readQuery({
          //   query: getPrayerRequestById,
          //   variables: {
          //     prayerId: id,
          //   },
          // });
          const newPrayersList = currentSavedPrayers.savedPrayers.push(id);
          console.log('newPrayersList', newPrayersList);
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
};

export default PrayerActionMenuCardConnected;
