import React from 'react';
import { Query, Mutation } from 'react-apollo';
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
      <Query query={getUserProfile}>
        {({
          loading: profileLoading,
          data: {
            currentUser: {
              profile: {
                campus: { id: campusId } = {},
                firstName,
                lastName,
                photo = { uri: null },
              } = {},
            } = {},
          } = {},
        }) => (
          <Mutation mutation={ADD_PRAYER}>
            {(addPrayer) => (
              <AddPrayerForm
                loading={profileLoading}
                onSubmit={(values) => {
                  addPrayer({
                    variables: {
                      campusId,
                      text: values.prayer,
                      firstName,
                      lastName,
                      isAnonymous: values.anonymous,
                    },
                    refetchQueries: [{ query: GET_USER_PRAYERS }],
                  });
                  this.props.navigation.navigate('WithYou');
                }}
                avatarSource={photo}
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
