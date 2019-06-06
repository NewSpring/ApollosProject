import React from 'react';
import { ScrollView, View } from 'react-native';
import { Query, Mutation } from 'react-apollo';
import { get } from 'lodash';
import { styled } from '@apollosproject/ui-kit';

import PrayerCard from '../PrayerCard';
import GET_SAVED_PRAYERS from '../data/queries/getSavedPrayers';
import UNSAVE_PRAYER from '../data/mutations/unSavePrayer';

const StyledView = styled(({ theme }) => ({
  marginBottom: theme.sizing.baseUnit * 4,
}))(View);

const SavedPrayerList = () => (
  <ScrollView nestedScrollEnabled>
    <Query query={GET_SAVED_PRAYERS} fetchPolicy="cache-and-network">
      {({ data: { savedPrayers = [] } = {} }) => (
        <Mutation
          mutation={UNSAVE_PRAYER}
          update={async (cache, { data: { unSavePrayer } }) => {
            const prayers = cache.readQuery({
              query: GET_SAVED_PRAYERS,
            });
            const { id } = unSavePrayer;
            const updatedPrayers = prayers.savedPrayers.filter(
              (prayer) => prayer.id !== id
            );
            await cache.writeQuery({
              query: GET_SAVED_PRAYERS,
              data: { savedPrayers: updatedPrayers },
            });
          }}
        >
          {(unSave) => (
            <StyledView>
              {savedPrayers
                .map((prayer) => (
                  <PrayerCard
                    avatarSource={get(prayer, 'person.photo')}
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
