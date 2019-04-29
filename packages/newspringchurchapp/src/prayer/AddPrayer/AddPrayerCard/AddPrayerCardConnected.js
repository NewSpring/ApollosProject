import React, { memo } from 'react';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import getProfilePic from '../../getProfilePic';
import AddPrayerCard from './AddPrayerCard';

const AddPrayerCardConnected = memo(({ ...props }) => (
  <Query query={getProfilePic} fetchPolicy={'cache-only'}>
    {({ data }) => (
      <AddPrayerCard
        imgSrc={get(data, 'currentUser.profile.photo', { uri: '' })}
        {...props}
      />
    )}
  </Query>
));

AddPrayerCardConnected.displayName = 'AddPrayerCardConnected';

export default AddPrayerCardConnected;
