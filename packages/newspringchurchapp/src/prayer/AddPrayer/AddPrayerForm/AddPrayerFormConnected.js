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
            update={(cache, { data: { addPrayer } }) => {
              const { prayers } = cache.readQuery({ query: GET_PRAYERS });
              cache.writeQuery({
                query: GET_PRAYERS,
                data: { prayers: prayers.concat([addPrayer]) },
              });
            }}
          >
            {(addPrayer) => (
              <AddPrayerForm
                onSubmit={() => {
                  addPrayer({
                    variables: {
                      campusID: 'fake',
                      categoryID: 2,
                      text: 'prayer',
                      firstName: 'Michael',
                      lastName: 'Neeley',
                      isAnonymous: false,
                    },
                  });
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
