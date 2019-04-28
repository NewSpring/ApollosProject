import React, { memo } from 'react';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import getProfilePic from '../../getProfilePic';
import AddPrayerForm from './AddPrayerForm';

const AddPrayerFormConnected = memo(({ ...props }) => (
  <Query query={getProfilePic} fetchPolicy={'cache-only'}>
    {({ data }) => (
      <AddPrayerForm
        imgSrc={get(data, 'currentUser.profile.photo', { uri: '' })}
        {...props}
      />
    )}
  </Query>
));

AddPrayerFormConnected.displayName = 'AddPrayerFormConnected';

export default AddPrayerFormConnected;
