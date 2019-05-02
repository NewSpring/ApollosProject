import React from 'react';
import { ScrollView, View } from 'react-native';
import { Query, Mutation } from 'react-apollo';
import { styled } from '@apollosproject/ui-kit';

import PrayerCard from '../PrayerCard';
import savedPrayerList from '../data/queries/getSavedPrayers';
import deleteSavedPrayer from '../data/mutations/deleteSavedPrayer';

const StyledView = styled(({ theme }) => ({
  marginTop: theme.sizing.baseUnit * 1.5,
  marginBottom: theme.sizing.baseUnit * 4,
}))(View);

const SavedPrayerList = () => (
  <ScrollView>
    <Query query={savedPrayerList} fetchPolicy="cache-and-network">
      {({ data: { savedPrayers = [] } = {} }) => (
        <Mutation
          mutation={deleteSavedPrayer}
          update={async (cache, { data: { unSavePrayer } }) => {
            const currentSavedPrayers = cache.readQuery({
              query: savedPrayerList,
            });
            const { id } = unSavePrayer;
            const newPrayersList = currentSavedPrayers.savedPrayers.filter(
              (prayer) => prayer.id !== id
            );
            await cache.writeQuery({
              query: savedPrayerList,
              data: { savedPrayers: newPrayersList },
            });
          }}
        >
          {(unsavePrayer) => (
            <StyledView>
              {savedPrayers
                .map((prayer) => (
                  <PrayerCard
                    avatarSource={prayer.person.photo.uri}
                    avatarSize={'medium'}
                    name={prayer.firstName}
                    campus={prayer.campus.name}
                    key={prayer.id}
                    created={prayer.enteredDateTime}
                    prayer={prayer.text}
                    showHelp
                    header
                    options={[
                      {
                        title: 'Remove Prayer',
                        method: async () => {
                          await unsavePrayer({
                            variables: {
                              nodeId: prayer.id,
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

export default SavedPrayerList;
