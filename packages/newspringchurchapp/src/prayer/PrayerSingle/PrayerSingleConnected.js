import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import INCREMENT_PRAYER_COUNT from '../data/mutations/incrementPrayerCount';
import PrayerSingle from './PrayerSingle';

const PrayerSingleConnected = memo(({ prayerId, ...props }) => (
  <Mutation mutation={INCREMENT_PRAYER_COUNT}>
    {(incrementPrayerCount) => (
      <PrayerSingle
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

PrayerSingleConnected.propTypes = {
  prayerId: PropTypes.string,
};

PrayerSingleConnected.displayName = 'PrayerSingleConnected';

export default PrayerSingleConnected;
