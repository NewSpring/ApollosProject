import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { get } from 'lodash';
import getUserProfile from 'newspringchurchapp/src/tabs/connect/getUserProfile';
import getPrayers from 'newspringchurchapp/src/prayer/data/queries/getUserPrayers';
import addPrayer from '../../data/mutations/addPrayer';
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
            mutation={addPrayer}
            update={(cache, { data: { addPublicPrayerRequest } }) => {
              const { getCurrentPersonPrayerRequests } = cache.readQuery({
                query: getPrayers,
              });
              cache.writeQuery({
                query: getPrayers,
                data: {
                  getCurrentPersonPrayerRequests: getCurrentPersonPrayerRequests.concat(
                    [addPublicPrayerRequest]
                  ),
                },
              });
            }}
          >
            {(createPrayer) => (
              <AddPrayerForm
                onSubmit={(values) => {
                  createPrayer({
                    variables: {
                      campusID: get(userData, 'currentUser.profile.campus.id'),
                      // TODO: make this dynamic
                      categoryID: 2,
                      text: values.prayer,
                      firstName: get(userData, 'currentUser.profile.firstName'),
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
              />
            )}
          </Mutation>
        )}
      </Query>
    );
  }
}

export default AddPrayerFormConnected;
