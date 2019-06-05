import React, { PureComponent } from 'react';
import { FlatList, View } from 'react-native';
import { Query, Mutation } from 'react-apollo';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import {
  BodyText,
  FlexedView,
  H3,
  H6,
  ModalView,
  PaddedView,
  styled,
} from '@apollosproject/ui-kit';

import PrayerCardConnected from 'newspringchurchapp/src/prayer/PrayerCard/PrayerCardConnected';
import cache from '../../client/cache';
import getUserProfile from '../../tabs/connect/getUserProfile';
import FLAG_PRAYER from '../data/mutations/flagPrayer';
import GET_GROUP_PRAYERS from '../data/queries/getGroupPrayers';
import GET_PRAYERS from '../data/queries/getPrayers';
import GET_CAMPUS_PRAYERS from '../data/queries/getCampusPrayers';

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

const StyledView = styled(({ theme }) => ({
  alignItems: 'center',
  marginTop: theme.sizing.baseUnit * 2,
}))(PaddedView);

const StyledH3View = styled(({ theme }) => ({
  marginBottom: theme.sizing.baseUnit,
}))(View);

/**
 * This is where the component description lives
 * A FeedView wrapped in a query to pull content data.s
 */
class PrayerList extends PureComponent {
  /** Function for React Navigation to set information in the header. */
  static navigationOptions = {
    header: null,
  };

  state = {
    currentCardIndex: 0,
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

  scrollToNext = () => {
    this.scroller.scrollToIndex({
      index: this.state.currentCardIndex + 1,
      animated: true,
    });
    this.setState((prevState) => ({
      currentCardIndex: prevState.currentCardIndex + 1,
    }));
  };

  calculateQuery = () => {
    const { navigation } = this.props;
    const list = navigation.getParam('list', '');

    let query;
    let queryName;
    let type;
    let variables;

    switch (list) {
      case 'GroupPrayerList':
        query = GET_GROUP_PRAYERS;
        queryName = 'groupPrayers';
        type = 'community';
        break;
      case 'ChurchPrayerList':
        query = GET_PRAYERS;
        queryName = 'prayers';
        type = 'church';
        break;
      case 'CampusPrayerList': {
        const {
          currentUser: { profile: { campus: { id } = {} } = {} } = {},
        } = cache.readQuery({
          query: getUserProfile,
        });
        query = GET_CAMPUS_PRAYERS;
        queryName = 'campusPrayers';
        type = 'campus';
        variables = { campusId: id };
        break;
      }
      default:
        query = GET_PRAYERS;
        queryName = 'getPrayers';
        type = 'church';
        break;
    }
    return { query, queryName, type, variables };
  };

  render() {
    const { query, queryName, type, variables } = this.calculateQuery();
    const { navigation } = this.props;

    return (
      <ModalView>
        <PaddedFeedView>
          <Query
            query={query}
            variables={variables}
            fetchPolicy="cache-and-network"
          >
            {({ data }) => {
              const prayers = get(data, queryName, []);
              return prayers.length > 0 ? (
                <FlatList
                  ref={(scroller) => {
                    this.scroller = scroller;
                  }}
                  renderItem={(item) => (
                    <Mutation
                      mutation={FLAG_PRAYER}
                      update={async () => {
                        const newPrayersList = prayers[queryName].filter(
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
                        <PrayerCardConnected
                          avatarSize={'medium'}
                          expanded
                          actionsEnabled
                          navigation={navigation}
                          cardIndex={item.index}
                          prayerId={item.item.id}
                          advancePrayer={this.scrollToNext}
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
                  data={get(data, queryName, []).map((prayer) => ({
                    key: prayer.id,
                    id: prayer.id,
                    prayer: prayer.text,
                    source: prayer.campus.name || '',
                    name: prayer.firstName,
                    avatarSource: prayer.person.photo,
                    anonymous: prayer.isAnonymous,
                  }))}
                  scrollEnabled={false}
                />
              ) : (
                <StyledView>
                  <StyledH3View>
                    <H3>No Prayers!</H3>
                  </StyledH3View>
                  <BodyText>
                    {`There are currently no prayers for your ${type}. Go back and add one!`}
                  </BodyText>
                </StyledView>
              );
            }}
          </Query>
        </PaddedFeedView>
      </ModalView>
    );
  }
}

export default PrayerList;
