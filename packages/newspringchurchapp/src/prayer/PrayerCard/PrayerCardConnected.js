import React, { memo } from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

import getCampusPrayerRequests from '../PrayerList/getPublicPrayerRequests';
import flagPrayerRequest from './flagPrayerRequest';
import PrayerCard from './PrayerCard';

// eslint-disable-next-line react/display-name
const PrayerCardConnected = memo(({ id, ...props }) => (
  <Mutation
    mutation={flagPrayerRequest}
    update={async (cache, { data: { flagRequest } }) => {
      const currentPrayerList = cache.readQuery({
        query: getCampusPrayerRequests,
      });
      const flagIndex = currentPrayerList.getPublicPrayerRequests.findIndex(
        (prayer) => prayer.id === flagRequest.id
      );
      const incrementFlag = () => {
        currentPrayerList.getPublicPrayerRequests[flagIndex].flagCount += 1;
      };
      const updatedPrayerList = () => {
        currentPrayerList.getPublicPrayerRequests.forEach((prayer) =>
          prayer.id === flagRequest.id ? incrementFlag(prayer) : prayer
        );
        return currentPrayerList.getPublicPrayerRequests;
      };
      updatedPrayerList(currentPrayerList.getPublicPrayerRequests);
      await cache.writeQuery({
        query: getCampusPrayerRequests,
        data: { getPublicPrayerRequests: updatedPrayerList },
      });
    }}
  >
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
