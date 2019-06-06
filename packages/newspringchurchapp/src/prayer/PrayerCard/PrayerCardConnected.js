import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import INCREMENT_PRAYER_COUNT from '../data/mutations/incrementPrayerCount';
import PrayerCard from './PrayerCard';

const PrayerCardConnected = memo(({ prayerId, ...props }) => (
  <Mutation mutation={INCREMENT_PRAYER_COUNT}>
    {(incrementPrayerCount) => (
      <PrayerCard
        prayerId={prayerId}
        incrementPrayer={async () => {
          await incrementPrayerCount({
            variables: {
              parsedId: prayerId,
            },
          });
        }}
        {...props}
      />
    )}
  </Mutation>
));

PrayerCardConnected.propTypes = {
  prayerId: PropTypes.string,
};

PrayerCardConnected.displayName = 'PrayerCardConnected';

export default PrayerCardConnected;
