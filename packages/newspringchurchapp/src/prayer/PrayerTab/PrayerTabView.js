import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import { Dimensions, View } from 'react-native';
import { TabView } from 'react-native-tab-view';
import {
  styled,
  HorizontalTileFeed,
  TouchableScale,
} from '@apollosproject/ui-kit';
import PrayerMenuCard from '../PrayerMenuCard';

import getUserProfile from '../../tabs/connect/getUserProfile';
import GET_GROUP_PRAYERS from '../data/queries/getGroupPrayers';
import GET_PRAYERS from '../data/queries/getPrayers';
import GET_CAMPUS_PRAYERS from '../data/queries/getCampusPrayers';
import GET_SAVED_PRAYERS from '../data/queries/getSavedPrayers';
import PrayerTab from './index';

const getCategoryComponent = (key) => {
  switch (key) {
    case 'my-saved-prayers':
      return (
        <Query query={GET_SAVED_PRAYERS} fetchPolicy="cache-and-network">
          {({ data }) => {
            const prayers = get(data, 'savedPrayers', []);
            return (
              <PrayerTab
                prayers={prayers}
                query={GET_SAVED_PRAYERS}
                description={'Pray for your saved prayers'}
                list={'SavedPrayerList'}
                title={'My Saved Prayers'}
                type={'saved'}
              />
            );
          }}
        </Query>
      );
    case 'my-church':
      return (
        <Query query={GET_PRAYERS} fetchPolicy="cache-and-network">
          {({ data }) => {
            const prayers = get(data, 'prayers', []);
            return (
              <PrayerTab
                prayers={prayers}
                query={GET_PRAYERS}
                description={'Pray for the people in our church'}
                list={'ChurchPrayerList'}
                title={'My Church'}
                type={'church'}
              />
            );
          }}
        </Query>
      );
    case 'my-campus':
      return (
        <Query query={getUserProfile}>
          {({
            data: {
              currentUser: { profile: { campus: { id } = {} } = {} } = {},
            } = {},
            loading,
          }) => {
            if (loading) return null;
            return (
              <Query
                query={GET_CAMPUS_PRAYERS}
                variables={{ campusId: id }}
                fetchPolicy="cache-and-network"
              >
                {({ data }) => {
                  const prayers = get(data, 'campusPrayers', []);
                  return (
                    <PrayerTab
                      query={GET_CAMPUS_PRAYERS}
                      prayers={prayers}
                      description={'Pray for the people at your campus'}
                      list={'CampusPrayerList'}
                      title={'My Campus'}
                      type={'campus'}
                    />
                  );
                }}
              </Query>
            );
          }}
        </Query>
      );
    case 'my-community':
      return (
        <Query query={GET_GROUP_PRAYERS} fetchPolicy="cache-and-network">
          {({ data }) => {
            const prayers = get(data, 'groupsPrayers', []);
            return (
              <PrayerTab
                prayers={prayers}
                query={GET_GROUP_PRAYERS}
                description={'Pray for those people in your community'}
                list={'GroupPrayerList'}
                title={'My Community'}
                type={'community'}
              />
            );
          }}
        </Query>
      );
    default:
      return null;
  }
};

const TabWrapper = ({ component }) => <View>{component}</View>;

TabWrapper.propTypes = {
  component: PropTypes.element,
};

const StyledHorizontalTileFeed = styled({
  height: 0,
})(HorizontalTileFeed);

class PrayerTabView extends PureComponent {
  static propTypes = {
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.string,
        overlayColor: PropTypes.arrayOf(PropTypes.string),
        title: PropTypes.string,
        key: PropTypes.string,
      })
    ),
  };

  static defaultProps = {
    categories: [],
  };

  state = {
    index: 0,
    routes: this.props.categories.map((category) => ({
      key: category.key,
    })),
    prayerMenuItemSelected: 1,
    showStartPraying: true,
  };

  handleIndexChange = (index) => this.setState({ index });

  render() {
    return (
      <TabView
        initialLayout={{
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,
        }}
        navigationState={{ ...this.state }}
        renderScene={({ route }) => {
          switch (route.key) {
            case 'my-church': {
              return <TabWrapper component={getCategoryComponent(route.key)} />;
            }
            case 'my-campus': {
              return <TabWrapper component={getCategoryComponent(route.key)} />;
            }
            case 'my-community': {
              return <TabWrapper component={getCategoryComponent(route.key)} />;
            }
            case 'my-prayers': {
              return <TabWrapper component={getCategoryComponent(route.key)} />;
            }
            case 'my-saved-prayers': {
              return <TabWrapper component={getCategoryComponent(route.key)} />;
            }
            default:
              return null;
          }
        }}
        renderTabBar={(props) => (
          <StyledHorizontalTileFeed
            content={this.props.categories}
            renderItem={({ item }) => (
              <TouchableScale
                key={item.key}
                onPress={() => {
                  this.setState({ prayerMenuItemSelected: item.key });
                  props.jumpTo(item.key);
                }}
              >
                <PrayerMenuCard
                  image={item.image}
                  overlayColor={item.overlayColor}
                  title={item.title}
                  selected={this.state.prayerMenuItemSelected === item.key}
                />
              </TouchableScale>
            )}
            loadingStateObject={{
              node: {
                id: 'fakeId0',
                isLoading: true,
              },
            }}
          />
        )}
        onIndexChange={this.handleIndexChange}
        swipeEnabled={false}
      />
    );
  }
}

export default PrayerTabView;
