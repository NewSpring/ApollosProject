import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { View, ScrollView } from 'react-native';

import { styled } from '@apollosproject/ui-kit';

import PrayerSingle from '../PrayerSingle';

import DELETE_PRAYER from '../data/mutations/deletePrayer';
import GET_USER_PRAYERS from '../data/queries/getUserPrayers';

const StyledView = styled(({ theme }) => ({
  marginBottom: theme.sizing.baseUnit * 4,
}))(View);

const UserPrayerList = () => (
  <ScrollView nestedScrollEnabled>
    <Query query={GET_USER_PRAYERS} fetchPolicy="cache-and-network">
      {({ data: { userPrayers = [] } = {} }) => (
        <Mutation
          mutation={DELETE_PRAYER}
          update={async (cache, { data: { deletePrayer } }) => {
            const data = cache.readQuery({
              query: GET_USER_PRAYERS,
            });
            const { id } = deletePrayer;
            const updatedPrayers = data.userPrayers.filter(
              (prayer) => prayer.id !== id
            );
            await cache.writeQuery({
              query: GET_USER_PRAYERS,
              data: { userPrayers: updatedPrayers },
            });
          }}
        >
          {(deletePrayer) => (
            <StyledView>
              {userPrayers
                .map((prayer) => (
                  <PrayerSingle
                    key={prayer.id}
                    prayer={prayer}
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
