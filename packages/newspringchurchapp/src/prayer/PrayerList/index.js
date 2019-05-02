import React, { PureComponent } from 'react';
import { FlatList, View } from 'react-native';
import { Query, Mutation } from 'react-apollo';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { ModalView, styled, FlexedView, H6 } from '@apollosproject/ui-kit';

import PrayerCard from 'newspringchurchapp/src/prayer/PrayerCard/PrayerCard';
import cache from '../../client/cache';
import getUserProfile from '../../tabs/connect/getUserProfile';
import flagPrayerRequest from '../data/mutations/flagPrayerRequest';
import getGroupPrayerRequests from '../data/queries/getGroupPrayerRequests';
import getPublicPrayerRequests from '../data/queries/getPublicPrayerRequests';
import getPublicPrayerRequestsByCampus from '../data/queries/getCampusPrayerRequests';

const PaddedFeedView = styled(({ theme }) => ({
  paddingTop: theme.sizing.baseUnit * 5,
}))(View);

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
  static navigationOptions = {
    header: null,
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

  // This doesn't work. Just keeping it here for now
  scrollToNext = () =>
    this.scroller.scrollToOffset({ offset: 1000, animated: true });

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
      <ModalView>
        <PaddedFeedView>
          <Query
            query={query}
            variables={variables}
            fetchPolicy="cache-and-network"
          >
            {({ data }) => (
              <FlatList
                ref={(scroller) => {
                  this.scroller = scroller;
                }}
                renderItem={(item) => (
                  <Mutation
                    mutation={flagPrayerRequest}
                    update={async () => {
                      const prayerRequests = cache.readQuery({
                        query,
                      });
                      const newPrayersList = prayerRequests[prayers].filter(
                        (prayer) => prayer.id !== item.item.id
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
                    {(flagPrayer) => (
                      <PrayerCard
                        avatarSize={'medium'}
                        expanded
                        options={[
                          {
                            title: 'Flag as Inappropriate',
                            method: async () => {
                              await flagPrayer({
                                variables: {
                                  parsedId: item.item.id,
                                },
                              });
                            },
                            destructive: true,
                          },
                        ]}
                        {...item.item}
                      />
                    )}
                  </Mutation>
                )}
                ItemSeparatorComponent={() => (
                  <DividerView>
                    <GreyH6>Press down on card to pray</GreyH6>
                  </DividerView>
                )}
                data={get(data, prayers, []).map((prayer) => ({
                  key: prayer.id,
                  id: prayer.id,
                  prayer: prayer.text,
                  source: prayer.campus.name || '',
                  name: prayer.firstName,
                }))}
                scrollEnabled={false}
              />
            )}
          </Query>
        </PaddedFeedView>
      </ModalView>
    );
  }
}

export default PrayerList;
