import React, { PureComponent } from 'react';
import { Dimensions, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { TabView } from 'react-native-tab-view';
import {
  TouchableScale,
  HorizontalTileFeed,
  PaddedView,
  FlexedView,
  styled,
  Button,
  BodyText,
  H3,
  H4,
} from '@apollosproject/ui-kit';
import AddPrayerCard from './AddPrayer/AddPrayerCard';
import PrayerMenuCard from './PrayerMenuCard';

const VerticalPaddedView = styled(({ theme }) => ({
  paddingBottom: theme.sizing.baseUnit,
}))(View);

const StyledBodyText = styled(({ theme }) => ({
  color: theme.colors.white,
}))(BodyText);

const StyledH3 = styled(({ theme }) => ({
  color: theme.colors.white,
}))(H3);

const StyledH4 = styled(({ theme }) => ({
  color: theme.colors.white,
}))(H4);

const StyledHorizontalTileFeed = styled({
  height: 0,
})(HorizontalTileFeed);

const MenuView = styled(({ theme }) => ({
  paddingTop: theme.sizing.baseUnit * 2,
}))(FlexedView);

const Tab = withNavigation(
  ({ title, description, showStartPraying, route, ...props }) => (
    <PaddedView>
      {showStartPraying ? (
        <View>
          <VerticalPaddedView>
            <StyledBodyText>{description}</StyledBodyText>
          </VerticalPaddedView>
          <Button
            title="Start Praying"
            onPress={() =>
              props.navigation.navigate('PrayerList', { list: route })
            }
          />
        </View>
      ) : (
        <VerticalPaddedView>
          <StyledH4>There are no prayers yet for {title}</StyledH4>
          <StyledBodyText>Be the first to add one!</StyledBodyText>
        </VerticalPaddedView>
      )}
    </PaddedView>
  )
);

Tab.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  route: PropTypes.string,
};

class PrayerMenu extends PureComponent {
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
      <FlexedView>
        <AddPrayerCard
          description={
            'Take a moment to send a prayer request that your NewSpring Church family can pray for.'
          }
          {...this.props}
        />
        <MenuView>
          <PaddedView>
            <StyledH3>Pray for Others</StyledH3>
          </PaddedView>
          <TabView
            initialLayout={{
              height: Dimensions.get('window').height,
              width: Dimensions.get('window').width,
            }}
            navigationState={{ ...this.state }}
            renderScene={({ route }) => {
              const scenes = {};
              this.props.categories.forEach((category) => {
                scenes[category.key] = (
                  <Tab
                    description={category.description}
                    showStartPraying={this.state.showStartPraying}
                    route={category.route}
                    title={category.title}
                  />
                );
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
        </MenuView>
      </FlexedView>
    );
  }
}

export default PrayerMenu;
