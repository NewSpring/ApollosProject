import React from 'react';
import { ScrollView, View } from 'react-native';
import { Query, Mutation } from 'react-apollo';
import { get } from 'lodash';
import { styled } from '@apollosproject/ui-kit';

import PrayerCard from '../PrayerCard';
import savedPrayerList from '../data/queries/getSavedPrayers';
import unSavePrayer from '../data/mutations/unSavePrayer';

const StyledView = styled(({ theme }) => ({
  marginTop: theme.sizing.baseUnit * 1.5,
  marginBottom: theme.sizing.baseUnit * 4,
}))(View);

const SavedPrayerList = () => (
  <ScrollView>
    <Query query={savedPrayerList} fetchPolicy="cache-and-network">
      {({ data: { savedPrayers = [] } = {} }) => (
        <Mutation
          mutation={unSavePrayer}
          update={async (cache, { data: { unSavePrayer: returnedPrayer } }) => {
            const currentSavedPrayers = cache.readQuery({
              query: savedPrayerList,
            });
            const { id } = returnedPrayer;
            const newPrayersList = currentSavedPrayers.savedPrayers.filter(
              (prayer) => prayer.id !== id
            );
            await cache.writeQuery({
              query: savedPrayerList,
              data: { savedPrayers: newPrayersList },
            });
          }}
        >
          {(unSave) => (
            <StyledView>
              {savedPrayers
                .map((prayer) => (
                  <PrayerCard
                    avatarSource={get(prayer, 'person.photo.uri')}
                    avatarSize={'medium'}
                    name={get(prayer, 'firstName')}
                    source={get(prayer, 'campus.name')}
                    key={get(prayer, 'id')}
                    prayer={get(prayer, 'text')}
                    anonymous={get(prayer, 'isAnonymous', false)}
                    showHelp={false}
                    header
                    options={[
                      {
                        title: 'Remove Prayer',
                        method: async () => {
                          await unSave({
                            variables: {
                              nodeId: get(prayer, 'id'),
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
