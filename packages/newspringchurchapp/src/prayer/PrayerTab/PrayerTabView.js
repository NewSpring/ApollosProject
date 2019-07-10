import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';
import {
  styled,
  HorizontalTileFeed,
  TouchableScale,
} from '@apollosproject/ui-kit';
import PrayerMenuCard from '../PrayerMenuCard';
import PrayerTabConnected from './PrayerTabConnected';

const getCategory = (key) => {
  switch (key) {
    case 'my-saved-prayers':
      return key;
    case 'my-church':
      return key;
    case 'my-campus':
      return key;
    case 'my-community':
      return key;
    default:
      return 'my-church';
  }
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
          const scenes = {};
          this.props.categories.map((category) => {
            scenes[category.key] = (
              <PrayerTabConnected
                categoryKey={getCategory(category.key)}
                category={category}
              />
            );
            return category.route;
          });
          return scenes[route.key];
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
