import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import {
  BackgroundView,
  FeedView,
  ModalViewHeader,
} from '@apollosproject/ui-kit';

import PrayerCardConnected from 'newspringchurchapp/src/prayer/PrayerCard/PrayerCardConnected';
import getPublicPrayerRequests from './getPublicPrayerRequests';

/**
 * This is where the component description lives
 * A FeedView wrapped in a query to pull content data.
 */
class ChurchPrayerList extends PureComponent {
  /** Function for React Navigation to set information in the header. */
  static navigationOptions = ({ navigation }) => ({
    header: <ModalViewHeader onClose={() => navigation.popToTop()} />,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      push: PropTypes.func,
    }),
  };

  /** Function that is called when a card in the feed is pressed.
   * Takes the user to the ContentSingle
   */
  handleOnPress = () => console.log('HIHIHIHI');

  render() {
    return (
      <BackgroundView>
        <Query query={getPublicPrayerRequests} fetchPolicy="cache-and-network">
          {({ loading, error, data, refetch }) => (
            <FeedView
              ListItemComponent={PrayerCardConnected}
              content={get(data, 'getPublicPrayerRequests', []).map(
                (prayer) => ({
                  id: prayer.id,
                  prayer: prayer.text,
                  source: prayer.campusId,
                  name: prayer.firstName,
                  ...prayer,
                })
              )}
              isLoading={loading}
              error={error}
              refetch={refetch}
              onPressItem={this.handleOnPress}
            />
          )}
        </Query>
      </BackgroundView>
    );
  }
}

export default ChurchPrayerList;
