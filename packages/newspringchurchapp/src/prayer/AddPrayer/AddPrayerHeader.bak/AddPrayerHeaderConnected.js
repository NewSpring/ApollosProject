import React from 'react';
import { View } from 'react-native';
import { Query } from 'react-apollo';

import getProfilePic from './getProfilePic';
import AddPrayerHeader from './AddPrayerHeader';

const AddPrayerHeaderConnected = () => (
  <View>
    <Query query={getProfilePic} fetchPolicy="cache-and-network">
      {({ data }) => <AddPrayerHeader imgSrc={data.photo} />}
    </Query>
  </View>
);

export default AddPrayerHeaderConnected;
