import React, { memo } from 'react';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import getProfilePic from '../../getProfilePic';
import AddPrayerForm from './AddPrayerForm';

const AddPrayerFormConnected = memo(({ ...props }) => (
  <Query query={getProfilePic} fetchPolicy={'cache-only'}>
    {({ data }) => (
      <AddPrayerForm
        avatarSource={get(data, 'currentUser.profile.photo', { uri: null })}
        {...props}
      />
    )}
  </Query>
));

AddPrayerFormConnected.displayName = 'AddPrayerFormConnected';

export default AddPrayerFormConnected;
