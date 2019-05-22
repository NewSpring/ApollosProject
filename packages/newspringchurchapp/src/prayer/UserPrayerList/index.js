import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { View, ScrollView } from 'react-native';

import { styled } from '@apollosproject/ui-kit';

import PrayerCard from '../PrayerCard';

import deleteUserPrayer from '../data/mutations/deleteUserPrayer';
import getUserPrayers from '../data/queries/getUserPrayers';

const StyledView = styled(({ theme }) => ({
  marginTop: theme.sizing.baseUnit * 1.5,
  marginBottom: theme.sizing.baseUnit * 4,
}))(View);

const UserPrayerList = () => (
  <ScrollView nestedScrollEnabled>
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
          {(deletePrayer) => (
            <StyledView>
              {getCurrentPersonPrayerRequests
                .map((prayer) => (
                  <PrayerCard
                    key={prayer.id}
                    created={prayer.enteredDateTime}
                    prayer={prayer.text}
                    showHelp={false}
                    header={false}
                    options={[
                      {
                        title: 'Delete Prayer',
                        method: async () => {
                          await deletePrayer({
                            variables: {
                              parsedId: prayer.id,
                            },
                          });
                        },
                        destructive: true,
                      },
                    ]}
                  />
                ))
                .reverse()}
            </StyledView>
          )}
        </Mutation>
      )}
    </Query>
  </ScrollView>
);

export default UserPrayerList;
