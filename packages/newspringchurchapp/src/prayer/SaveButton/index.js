import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import SAVE_PRAYER from '../data/mutations/savePrayer';
import UNSAVE_PRAYER from '../data/mutations/unSavePrayer';
import GET_SAVED_PRAYERS from '../data/queries/getSavedPrayers';
import SaveButton from './SaveButton';

class SaveButtonConnected extends React.Component {
  state = {
    savedButton: this.props.saved,
  };

  static propTypes = {
    prayerID: PropTypes.string,
    saved: PropTypes.bool,
  };

  render() {
    return (
      <Mutation mutation={SAVE_PRAYER}>
        {(save) => (
          <Mutation mutation={UNSAVE_PRAYER}>
            {(unSave) => (
              <SaveButton
                saved={this.state.savedButton}
                onPress={() => {
                  this.setState((prevState) => ({
                    savedButton: !prevState.savedButton,
                  }));
                  return this.state.savedButton
                    ? unSave({
                        variables: { nodeId: this.props.prayerID },
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
                      })
                    : save({
                        variables: { nodeId: this.props.prayerID },
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
                      });
                }}
              />
            )}
          </Mutation>
        )}
      </Mutation>
    );
  }
}

export default SaveButtonConnected;
