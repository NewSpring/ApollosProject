import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { unionBy } from 'lodash';
import { Mutation } from 'react-apollo';

import SAVE_PRAYER from '../data/mutations/savePrayer';
import GET_SAVED_PRAYERS from '../data/queries/getSavedPrayers';
import PrayerActionMenuCard from './PrayerActionMenuCard';

const PrayerActionMenuCardConnected = memo(
  ({ onAdvancePrayer, navigation, prayerRequest, ...props }) => {
    const exitPrayer = () => navigation.navigate('Prayer');
    return (
      <Mutation
        mutation={SAVE_PRAYER}
        update={async (cache) => {
          const { savedPrayers } = cache.readQuery({
            query: GET_SAVED_PRAYERS,
          });
          // This methods compares the incoming prayer by id to the items in
          // the array and if it's not in the array, it adds it.
          const newPrayersList = unionBy(
            savedPrayers,
            [prayerRequest],
            (prayer) => prayer.id
          );
          await cache.writeQuery({
            query: GET_SAVED_PRAYERS,
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
                  nodeId: prayerRequest.id,
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
