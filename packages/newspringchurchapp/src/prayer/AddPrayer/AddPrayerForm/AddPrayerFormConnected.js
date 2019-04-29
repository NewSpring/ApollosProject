import React from 'react';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import getProfilePic from '../../getProfilePic';
import AddPrayerForm from './AddPrayerForm';

class AddPrayerFormConnected extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Query query={getProfilePic} fetchPolicy={'cache-only'}>
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
