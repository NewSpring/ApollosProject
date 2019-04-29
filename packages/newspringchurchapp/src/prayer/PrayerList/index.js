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
import cache from '../../client/cache';
import getUserProfile from '../../tabs/connect/getUserProfile';
import getGroupPrayerRequests from './getGroupPrayerRequests';
import getPublicPrayerRequests from './getPublicPrayerRequests';
import getPublicPrayerRequestsByCampus from './getCampusPrayerRequests';

const PaddedFeedView = styled(({ theme }) => ({
  paddingTop: theme.sizing.baseUnit * 7,
}))(FeedView);
/**
 * This is where the component description lives
 * A FeedView wrapped in a query to pull content data.s
 */
class PrayerList extends PureComponent {
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
  handleOnPress = () => this.scrollToNextPrayer();

  // This doesn't work. Just keeping it here for now
  scrollToNextPrayer = () =>
    this.scroller.scrollTo({ x: 0, y: 1000, animated: true });

  render() {
    const { navigation } = this.props;
    const list = navigation.getParam('list', '');

    let query;
    let prayers;
    let variables = {};

    switch (list) {
      case 'GroupPrayerList':
        query = getGroupPrayerRequests;
        prayers = 'getPrayerRequestsByGroups';
        break;
      case 'ChurchPrayerList':
        query = getPublicPrayerRequests;
        prayers = 'getPublicPrayerRequests';
        break;
      case 'CampusPrayerList': {
        const {
          currentUser: {
            profile: { campus: { id: campusId = '' } = {} } = {},
          } = {},
        } = cache.readQuery({
          query: getUserProfile,
        });
        query = getPublicPrayerRequestsByCampus;
        prayers = 'getPublicPrayerRequestsByCampus';
        variables = { campusId };
        break;
      }
      default:
        query = getPublicPrayerRequests;
        prayers = 'getPublicPrayerRequests';
        break;
    }
    return (
      <BackgroundView>
        <Query
          query={query}
          variables={variables}
          fetchPolicy="cache-and-network"
        >
          {({ loading, error, data, refetch }) => (
            <PaddedFeedView
              ref={(scroller) => {
                this.scroller = scroller;
              }}
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
              content={get(data, prayers, []).map((prayer) => ({
                id: prayer.id,
                text: prayer.text,
                source: prayer.campusId,
                name: prayer.firstName,
                ...prayer,
              }))}
              isLoading={loading}
              scrollEnabled={false}
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

export default PrayerList;
