import React from 'react';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import getUserProfile from 'newspringchurchapp/src/tabs/connect/getUserProfile';
import AddPrayerForm from './AddPrayerForm';

class AddPrayerFormConnected extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Query query={getUserProfile} fetchPolicy={'cache-only'}>
        {({ data }) => (
          <AddPrayerForm
            avatarSource={get(data, 'currentUser.profile.photo', { uri: null })}
            {...this.props}
          />
        )}
      </Query>
    );
  }
}

export default AddPrayerFormConnected;
