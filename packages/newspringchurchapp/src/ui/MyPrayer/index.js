import React from 'react';
import { Query } from 'react-apollo';
import { View } from 'react-native';

import { PaddedView, CardContent, styled, H5 } from '@apollosproject/ui-kit';

import MyPrayerCard from './MyPrayerCard';
import getMyPrayers from './getMyPrayers';

const Header = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.paper,
}))(CardContent);

const Content = styled(() => ({
  borderBottomWidth: 0,
  borderTopWidth: 0,
}))(View);

const MyPrayersView = styled(() => ({
  paddingHorizontal: 0,
}))(PaddedView);

const MyPrayers = () => (
  <MyPrayersView>
    <Header>
      <H5>My Prayers</H5>
    </Header>
    <Query query={getMyPrayers} fetchPolicy="cache-and-network">
      {({ data: { getCurrentPersonPrayerRequests = [] } = {} }) => (
        <Content>
          {getCurrentPersonPrayerRequests.map((prayer) => (
            <MyPrayerCard
              key={prayer.id}
              duration={prayer.enteredDateTime}
              text={prayer.text}
            />
          ))}
        </Content>
      )}
    </Query>
  </MyPrayersView>
);
export default MyPrayers;
