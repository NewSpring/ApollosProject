import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import SAVE_PRAYER from '../data/mutations/savePrayer';
import UNSAVE_PRAYER from '../data/mutations/unSavePrayer';
import GET_SAVED_PRAYERS from '../data/queries/getSavedPrayers';
import SaveButton from './SaveButton';

const SaveButtonConnected = memo(({ prayerID, saved, toggleSavedState }) => (
  <Mutation mutation={SAVE_PRAYER}>
    {(save) => (
      <Mutation mutation={UNSAVE_PRAYER}>
        {(unSave) => (
          <SaveButton
            saved={saved}
            onPress={() => {
              toggleSavedState();
              if (saved)
                unSave({
                  variables: { nodeId: prayerID },
                  refetchQueries: [GET_SAVED_PRAYERS],
                });
              else
                save({
                  variables: { nodeId: prayerID },
                  refetchQueries: [GET_SAVED_PRAYERS],
                });
            }}
          />
        )}
      </Mutation>
    )}
  </Mutation>
));

SaveButtonConnected.propTypes = {
  prayerID: PropTypes.string,
  saved: PropTypes.bool,
  toggleSavedState: PropTypes.func,
};

SaveButtonConnected.displayName = 'SaveButtonConnected';

export default SaveButtonConnected;
