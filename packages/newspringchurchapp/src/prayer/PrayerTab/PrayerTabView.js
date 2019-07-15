import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Dimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';
import {
  styled,
  HorizontalTileFeed,
  TouchableScale,
} from '@apollosproject/ui-kit';
import PrayerMenuCard from '../PrayerMenuCard';
import PrayerListQuery from '../PrayerList/PrayerListQuery';
import GET_GROUP_PRAYERS from '../data/queries/getGroupPrayers';
import GET_PRAYERS from '../data/queries/getPrayers';
import GET_CAMPUS_PRAYERS from '../data/queries/getCampusPrayers';
import GET_SAVED_PRAYERS from '../data/queries/getSavedPrayers';
import PrayerTab from '.';

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
      title: category.title,
      description: category.description,
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
        renderScene={({ route }) => <PrayerListQuery route={route} />}
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
