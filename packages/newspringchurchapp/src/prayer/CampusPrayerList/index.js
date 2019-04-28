import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import {
  FeedView,
  BackgroundView,
  PaddedView,
  ModalViewHeader,
  styled,
  FlexedView,
  H6,
} from '@apollosproject/ui-kit';

import PrayerCardConnected from 'newspringchurchapp/src/prayer/PrayerCard/PrayerCardConnected';
import getCampusPrayerRequests from './getCampusPrayerRequests';

const PaddedFeedView = styled(({ theme }) => ({
  paddingTop: theme.sizing.baseUnit * 7,
}))(FeedView);
/**
 * This is where the component description lives
 * A FeedView wrapped in a query to pull content data.s
 */
class CampusPrayerList extends PureComponent {
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
  handleOnPress = (item) => console.log('Prayer for: ', item);

  render() {
    return (
      <BackgroundView>
        <Query
          query={getCampusPrayerRequests}
          variables={{ campusId: 2 }}
          fetchPolicy="cache-and-network"
        >
          {({ loading, error, data, refetch }) => (
            <PaddedFeedView
              ListItemComponent={(item) => (
                <PaddedView>
                  <PrayerCardConnected onPress={this.handleOnPress} {...item} />
                </PaddedView>
              )}
              ItemSeparatorComponent={() => (
                <FlexedView>
                  <H6>Press down on heart to pray</H6>
                </FlexedView>
              )}
              content={get(data, 'getPublicPrayerRequestsByCampus', []).map(
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

export default CampusPrayerList;
