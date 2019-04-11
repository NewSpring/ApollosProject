import React from 'react';
import { View } from 'react-native';
import { Query } from 'react-apollo';

import getProfilePic from './getProfilePic';
import AddPrayerCard from './AddPrayerCard';

const ConnectedAddPrayer = () => (
  <View>
    <Query query={getProfilePic} fetchPolicy="cache-and-network">
      {({ data }) => <AddPrayerCard imgSrc={data.photo} />}
    </Query>
  </View>
);

export default ConnectedAddPrayer;
