import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import SAVE_PRAYER from '../data/mutations/savePrayer';
import UNSAVE_PRAYER from '../data/mutations/unSavePrayer';
import GET_SAVED_PRAYERS from '../data/queries/getSavedPrayers';
import SaveButton from './SaveButton';

const SaveButtonConnected = memo(({ prayerID, saved }) => (
  <Mutation mutation={SAVE_PRAYER}>
    {(save) => (
      <Mutation mutation={UNSAVE_PRAYER}>
        {(unSave) => (
          <SaveButton
            saved={saved}
            onPress={() =>
              saved
                ? unSave({
                    variables: { nodeId: prayerID },
                    update: (
                      cache,
                      {
                        data: {
                          unSavePrayer: { id },
                        },
                      }
                    ) => {
                      const data = cache.readQuery({
                        query: GET_SAVED_PRAYERS,
                      });
                      const filteredPrayers = data.savedPrayers.filter(
                        (prayer) => prayer.id !== id
                      );
                      cache.writeQuery({
                        query: GET_SAVED_PRAYERS,
                        data: { savedPrayers: filteredPrayers },
                      });
                    },
                    optimisticResponse: {
                      unSavePrayer: {
                        __typename: 'PrayerRequest',
                        id: prayerID,
                        isAnonymous: true,
                        text: '',
                        requestor: {
                          __typename: 'Person',
                          firstName: '',
                          lastName: '',
                          photo: {
                            __typename: 'ImageMedia',
                            uri: '',
                          },
                        },
                        flagCount: 0,
                        campus: {
                          __typename: 'Campus',
                          id: '',
                          name: '',
                        },
                        startTime: '',
                      },
                    },
                  })
                : save({
                    variables: { nodeId: prayerID },
                    update: (cache, { data: { savePrayer } }) => {
                      const data = cache.readQuery({
                        query: GET_SAVED_PRAYERS,
                      });
                      data.savedPrayers.push(savePrayer);
                      cache.writeQuery({
                        query: GET_SAVED_PRAYERS,
                        data,
                      });
                    },
                    optimisticResponse: {
                      savePrayer: {
                        __typename: 'PrayerRequest',
                        id: prayerID,
                        isAnonymous: true,
                        text: '',
                        requestor: {
                          __typename: 'Person',
                          firstName: '',
                          lastName: '',
                          photo: {
                            __typename: 'ImageMedia',
                            uri: '',
                          },
                        },
                        flagCount: 0,
                        campus: {
                          __typename: 'Campus',
                          id: '',
                          name: '',
                        },
                        startTime: '',
                      },
                    },
                  })
            }
          />
        )}
      </Mutation>
    )}
  </Mutation>
));

SaveButtonConnected.propTypes = {
  prayerID: PropTypes.string,
  saved: PropTypes.bool,
};

SaveButtonConnected.displayName = 'SaveButtonConnected';

export default SaveButtonConnected;
