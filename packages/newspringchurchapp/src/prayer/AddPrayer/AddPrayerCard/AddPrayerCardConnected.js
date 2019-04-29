import React, { memo } from 'react';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import getUserProfile from 'newspringchurchapp/src/tabs/connect/getUserProfile';
import AddPrayerCard from './AddPrayerCard';

const AddPrayerCardConnected = memo(({ ...props }) => (
  <Query query={getUserProfile} fetchPolicy={'cache-only'}>
    {({ data }) => (
      <AddPrayerCard
        avatarSource={get(data, 'currentUser.profile.photo', { uri: null })}
        {...props}
      />
    )}
  </Query>
));

AddPrayerCardConnected.displayName = 'AddPrayerCardConnected';

export default AddPrayerCardConnected;
