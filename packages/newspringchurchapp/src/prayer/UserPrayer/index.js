import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { View } from 'react-native';

import { styled } from '@apollosproject/ui-kit';

import UserPrayerCard from './UserPrayerCard';

import deleteUserPrayer from './deleteUserPrayer';
import getUserPrayers from './getUserPrayers';

const StyledView = styled(({ theme }) => ({
  marginTop: theme.sizing.baseUnit * 1.5,
  marginBottom: theme.sizing.baseUnit * 4,
}))(View);

const UserPrayerList = () => (
  <Query query={getUserPrayers} fetchPolicy="cache-and-network">
    {({ data: { getCurrentPersonPrayerRequests = [] } = {} }) => (
      <Mutation
        mutation={deleteUserPrayer}
        update={async (cache, { data: { deletePublicPrayerRequest } }) => {
          const currentCurrentPersonPrayerRequests = cache.readQuery({
            query: getUserPrayers,
          });
          const { id } = deletePublicPrayerRequest;
          const newPrayersList = currentCurrentPersonPrayerRequests.getCurrentPersonPrayerRequests.filter(
            (prayer) => prayer.id !== id
          );
          await cache.writeQuery({
            query: getUserPrayers,
            data: { getCurrentPersonPrayerRequests: newPrayersList },
          });
        }}
      >
        {(handlePress) => (
          <StyledView>
            {getCurrentPersonPrayerRequests
              .map((prayer) => (
                <UserPrayerCard
                  key={prayer.id}
                  id={prayer.id}
                  duration={prayer.enteredDateTime}
                  text={prayer.text}
                  deletePrayer={async () => {
                    await handlePress({
                      variables: {
                        parsedId: prayer.id,
                      },
                    });
                  }}
                />
              ))
              .reverse()}
          </StyledView>
        )}
      </Mutation>
    )}
  </Query>
);

export default UserPrayerList;