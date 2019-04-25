import React, { memo } from 'react';
import { Query } from 'react-apollo';
import getProfilePic from '../../getProfilePic';
import AddPrayerCard from './AddPrayerCard';

const AddPrayerCardConnected = memo(({ ...props }) => (
  <Query query={getProfilePic} fetchPolicy={'cache-and-network'}>
    {({ data }) => (
      <AddPrayerCard imgSrc={data.currentUser.profile.photo} {...props} />
    )}
  </Query>
));

AddPrayerCardConnected.displayName = 'AddPrayerCardConnected';

export default AddPrayerCardConnected;
