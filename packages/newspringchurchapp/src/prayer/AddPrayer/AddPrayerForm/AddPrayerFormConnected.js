import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { get } from 'lodash';
import GET_USER_PROFILE from 'newspringchurchapp/src/tabs/connect/getUserProfile';
import GET_PRAYERS from 'newspringchurchapp/src/prayer/UserPrayer/getUserPrayers';
import ADD_PRAYER from './addPrayer';
import AddPrayerForm from './AddPrayerForm';

class AddPrayerFormConnected extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Query query={GET_USER_PROFILE} fetchPolicy={'cache-only'}>
        {(queryObj) => (
          <Mutation
            mutation={ADD_PRAYER}
            update={(cache, { data: { addPublicPrayerRequest } }) => {
              const { getCurrentPersonPrayerRequests } = cache.readQuery({
                query: GET_PRAYERS,
              });
              cache.writeQuery({
                query: GET_PRAYERS,
                data: {
                  getCurrentPersonPrayerRequests: getCurrentPersonPrayerRequests.concat(
                    [addPublicPrayerRequest]
                  ),
                },
              });
            }}
          >
            {(addPrayer) => (
              <AddPrayerForm
                onSubmit={(values) => {
                  addPrayer({
                    variables: {
                      campusID: get(
                        queryObj.data,
                        'currentUser.profile.campus.id'
                      ),
                      // TODO: make this dynamic
                      categoryID: 2,
                      text: values.prayer,
                      firstName: get(
                        queryObj.data,
                        'currentUser.profile.firstName'
                      ),
                      lastName: get(
                        queryObj.data,
                        'currentUser.profile.lastName'
                      ),
                      isAnonymous: values.anonymous,
                    },
                  });
                  // TODO: wonder if this should be tied to the ModalView onClose method???
                  this.props.navigation.pop();
                }}
                avatarSource={get(queryObj.data, 'currentUser.profile.photo', {
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
