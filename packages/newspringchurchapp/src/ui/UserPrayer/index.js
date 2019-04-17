import React from 'react';
import { Query } from 'react-apollo';
import { View } from 'react-native';

import { styled } from '@apollosproject/ui-kit';

import UserPrayerCard from './UserPrayerCard';
import getUserPrayers from './getUserPrayers';

const StyledView = styled(({ theme }) => ({
  marginTop: theme.sizing.baseUnit * 1.5,
  marginBottom: theme.sizing.baseUnit * 4,
}))(View);

const UserPrayerList = () => (
  <Query query={getUserPrayers} fetchPolicy="cache-and-network">
    {({ data: { getCurrentPersonPrayerRequests = [] } = {} }) => (
      <StyledView>
        {getCurrentPersonPrayerRequests
          .map((prayer) => (
            <UserPrayerCard
              key={prayer.id}
              duration={prayer.enteredDateTime}
              text={prayer.text}
            />
          ))
          .reverse()}
      </StyledView>
    )}
  </Query>
);
export default UserPrayerList;
