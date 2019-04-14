import React from 'react';
import { Query } from 'react-apollo';
import { View } from 'react-native';

import { PaddedView, CardContent, styled, H5 } from '@apollosproject/ui-kit';

import UserPrayerCard from './UserPrayerCard';
import getUserPrayers from './getUserPrayers';

const Header = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.paper,
}))(CardContent);

const Content = styled(() => ({
  borderBottomWidth: 0,
  borderTopWidth: 0,
}))(View);

const UserPrayersView = styled(() => ({
  paddingHorizontal: 0,
}))(PaddedView);

const UserPrayersList = () => (
  <UserPrayersView>
    <Header>
      <H5>My Prayers</H5>
    </Header>
    <Query query={getUserPrayers} fetchPolicy="cache-and-network">
      {({ data: { getCurrentPersonPrayerRequests = [] } = {} }) => (
        <Content>
          {getCurrentPersonPrayerRequests
            .map((prayer) => (
              <UserPrayerCard
                key={prayer.id}
                duration={prayer.enteredDateTime}
                text={prayer.text}
              />
            ))
            .reverse()}
        </Content>
      )}
    </Query>
  </UserPrayersView>
);
export default UserPrayersList;
