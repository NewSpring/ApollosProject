import React, { memo } from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

import flagPrayerRequest from './flagPrayerRequest';
import PrayerCard from './PrayerCard';

// eslint-disable-next-line react/display-name
const PrayerCardConnected = memo(({ id, ...props }) => (
  <Mutation mutation={flagPrayerRequest}>
    {(handlePress) => (
      <PrayerCard
        flagRequest={async () => {
          await handlePress({
            variables: {
              parsedId: id,
            },
          });
        }}
        {...props}
      />
    )}
  </Mutation>
));

PrayerCardConnected.propTypes = {
  id: PropTypes.string,
};

export default PrayerCardConnected;
