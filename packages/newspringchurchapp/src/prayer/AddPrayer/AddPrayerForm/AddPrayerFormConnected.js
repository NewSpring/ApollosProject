import React, { memo } from 'react';
import { Query } from 'react-apollo';
import getProfilePic from '../../getProfilePic';
import AddPrayerForm from './AddPrayerForm';

const AddPrayerFormConnected = memo(({ ...props }) => (
  <Query query={getProfilePic} fetchPolicy={'cache-and-network'}>
    {({ data }) => (
      <AddPrayerForm imgSrc={data.currentUser.profile.photo} {...props} />
    )}
  </Query>
));

AddPrayerFormConnected.displayName = 'AddPrayerFormConnected';

export default AddPrayerFormConnected;
