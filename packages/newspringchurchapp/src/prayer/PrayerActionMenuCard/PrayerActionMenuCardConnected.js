import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import savePrayerRequest from '../data/mutations/savePrayerRequest';
import savedPrayerList from '../data/queries/getSavedPrayers';
import PrayerActionMenuCard from './PrayerActionMenuCard';

const PrayerActionMenuCardConnected = memo(
  ({ onAdvancePrayer, navigation, ...props }) => {
    const exitPrayer = () => navigation.navigate('Prayer');
    return (
      <Mutation
        mutation={savePrayerRequest}
        update={async (cache) => {
          const { savedPrayers } = cache.readQuery({
            query: savedPrayerList,
          });
          const newPrayersList = savedPrayers;
          newPrayersList.push(props.prayerRequest);
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
                  nodeId: props.prayerRequest.id,
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
  prayerRequest: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default PrayerActionMenuCardConnected;
