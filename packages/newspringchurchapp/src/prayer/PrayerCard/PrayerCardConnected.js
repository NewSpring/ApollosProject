import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import incrementRequestPrayed from '../data/mutations/incrementRequestPrayed';
import PrayerCard from './PrayerCard';

const PrayerCardConnected = memo(({ prayerId, ...props }) => (
  <Mutation mutation={incrementRequestPrayed}>
    {(incrementPrayed) => (
      <PrayerCard
        prayerId={prayerId}
        incrementPrayer={async () => {
          await incrementPrayed({
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
