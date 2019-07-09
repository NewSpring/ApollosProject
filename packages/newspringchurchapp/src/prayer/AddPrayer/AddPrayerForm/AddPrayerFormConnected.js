import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { get } from 'lodash';
import getUserProfile from 'newspringchurchapp/src/tabs/connect/getUserProfile';
import GET_USER_PRAYERS from 'newspringchurchapp/src/prayer/data/queries/getUserPrayers';
import ADD_PRAYER from '../../data/mutations/addPrayer';
import AddPrayerForm from './AddPrayerForm';

class AddPrayerFormConnected extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Query query={getUserProfile} fetchPolicy={'cache-only'}>
        {({ data: userData }) => (
          <Mutation
            mutation={ADD_PRAYER}
            update={(cache, { data: { addPrayer } }) => {
              const { userPrayers } = cache.readQuery({
                query: GET_USER_PRAYERS,
              });
              cache.writeQuery({
                query: GET_USER_PRAYERS,
                data: {
                  userPrayers: userPrayers.concat([addPrayer]),
                },
              });
            }}
          >
            {(addPrayer) => (
              <AddPrayerForm
                onSubmit={(values) => {
                  addPrayer({
                    variables: {
                      // web campus by default
                      campusId: get(
                        userData,
                        'currentUser.profile.campus.id',
                        20
                      ),
                      // TODO: make this dynamic
                      categoryId: 2,
                      text: values.prayer,
                      // Unknown by default
                      firstName: get(
                        userData,
                        'currentUser.profile.firstName',
                        'Unknown'
                      ),
                      lastName: get(userData, 'currentUser.profile.lastName'),
                      isAnonymous: values.anonymous,
                    },
                  });
                  // TODO: wonder if this should be tied to the ModalView onClose method???
                  this.props.navigation.pop();
                }}
                avatarSource={get(userData, 'currentUser.profile.photo', {
                  uri: null,
                })}
                {...this.props}
                onClose={() => this.props.navigation.pop()}
              />
            )}
          </Mutation>
        )}
      </Query>
    );
  }
}

export default AddPrayerFormConnected;
