import React, { PureComponent } from 'react';
import { Query, Mutation } from 'react-apollo';
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

import PrayerCard from 'newspringchurchapp/src/prayer/PrayerCard/PrayerCard';
import cache from '../../client/cache';
import getUserProfile from '../../tabs/connect/getUserProfile';
import flagPrayerRequest from '../PrayerCard/flagPrayerRequest';
import PrayerActionMenuCardConnected from '../PrayerActionMenuCard/PrayerActionMenuCardConnected';
import getGroupPrayerRequests from './getGroupPrayerRequests';
import getPublicPrayerRequests from './getPublicPrayerRequests';
import getPublicPrayerRequestsByCampus from './getCampusPrayerRequests';

const PaddedFeedView = styled(({ theme }) => ({
  paddingTop: theme.sizing.baseUnit * 5,
}))(FeedView);

const GreyH6 = styled(({ theme }) => ({
  color: theme.colors.text.tertiary,
}))(H6);

const DividerView = styled(({ theme }) => ({
  alignItems: 'center',
  marginBottom: theme.sizing.baseUnit,
}))(FlexedView);
/**
 * This is where the component description lives
 * A FeedView wrapped in a query to pull content data.s
 */
class PrayerList extends PureComponent {
  /** Function for React Navigation to set information in the header. */
  static navigationOptions = ({ navigation }) => ({
    header: <ModalViewHeader onClose={() => navigation.popToTop()} />,
  });

  state = {
    selectedPrayer: false,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      push: PropTypes.func,
    }),
  };

  /** Function that is called when a card in the feed is pressed.
   * Takes the user to the ContentSingle
   */
  handleOnPress = () => this.setState({ selectedPrayer: true });

  handleResetState = () => this.setState({ selectedPrayer: false });

  // This doesn't work. Just keeping it here for now
  scrollToNextPrayer = () =>
    this.scroller.scrollTo({ x: 0, y: 1000, animated: true });

  calculateQuery = () => {
    const { navigation } = this.props;
    const list = navigation.getParam('list', '');

    let query;
    let prayers;
    let variables;

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
          currentUser: { profile: { campus: { id } = {} } = {} } = {},
        } = cache.readQuery({
          query: getUserProfile,
        });
        query = getPublicPrayerRequestsByCampus;
        prayers = 'getPublicPrayerRequestsByCampus';
        variables = { campusId: id };
        break;
      }
      default:
        query = getPublicPrayerRequests;
        prayers = 'getPublicPrayerRequests';
        break;
    }
    return { query, prayers, variables };
  };

  render() {
    const { query, prayers, variables } = this.calculateQuery();
    const { navigation } = this.props;

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
                <Mutation
                  mutation={flagPrayerRequest}
                  update={async () => {
                    const prayerRequests = cache.readQuery({
                      query,
                    });
                    const newPrayersList = prayerRequests[prayers].filter(
                      (prayer) => prayer.id !== item.id
                    );
                    const newPrayerObject = {
                      [`${prayers}`]: newPrayersList,
                    };
                    await cache.writeQuery({
                      query,
                      data: newPrayerObject,
                    });
                  }}
                >
                  {(handlePress) =>
                    this.state.selectedPrayer ? (
                      <PaddedView>
                        <PrayerActionMenuCardConnected
                          onAdvancePrayer={this.handleResetState}
                          navigation={navigation}
                          {...item}
                        />
                      </PaddedView>
                    ) : (
                      <PaddedView>
                        <PrayerCard
                          onPress={this.handleOnPress}
                          flagRequest={async () => {
                            await handlePress({
                              variables: {
                                parsedId: item.id,
                              },
                            });
                          }}
                          {...item}
                        />
                      </PaddedView>
                    )
                  }
                </Mutation>
              )}
              ItemSeparatorComponent={() => (
                <DividerView>
                  <GreyH6>Press down on card to pray</GreyH6>
                </DividerView>
              )}
              content={get(data, prayers, []).map((prayer) => ({
                id: prayer.id,
                text: prayer.text,
                source: prayer.campus ? prayer.campus.name : '',
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
