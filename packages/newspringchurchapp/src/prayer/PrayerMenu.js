import React, { PureComponent } from 'react';
import { Dimensions, View, Animated } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import PropTypes from 'prop-types';
import { TabView } from 'react-native-tab-view';
import {
  TouchableScale,
  HorizontalTileFeed,
  PaddedView,
  FlexedView,
  styled,
  BodyText,
  H3,
} from '@apollosproject/ui-kit';
import AddPrayerCard from './AddPrayer/AddPrayerCard';
import PrayerMenuCard from './PrayerMenuCard';

const StyledFeed = styled(({ theme }) => ({
  paddingLeft: theme.sizing.baseUnit,
}))(HorizontalTileFeed);

const StyledPaddedView = styled(({ theme }) => ({
  marginTop: theme.sizing.baseUnit,
}))(PaddedView);

const StyledView = styled({
  height: Dimensions.get('window').height * 0.4,
  justifyContent: 'flex-end',
})(View);

const StyledBodyText = styled(({ theme }) => ({
  color: theme.colors.white,
}))(BodyText);

const StyledH3 = styled(({ theme }) => ({
  color: theme.colors.white,
}))(H3);

const StyledGreenView = styled(({ theme }) => ({
  backgroundColor: theme.colors.tertiary,
}))(View);

const MenuView = styled(({ theme }) => ({
  paddingTop: theme.sizing.baseUnit * 4,
}))(FlexedView);

const Tab = ({ description, component, showAddPrayerCard }) => (
  <>
    <StyledPaddedView>
      <StyledBodyText>{description}</StyledBodyText>
    </StyledPaddedView>
    {!showAddPrayerCard ? <StyledView>{component}</StyledView> : null}
  </>
);

Tab.propTypes = {
  description: PropTypes.string,
  component: PropTypes.func,
  showAddPrayerCard: PropTypes.bool,
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
    showAddPrayerCard: true,
    animatedValue: new Animated.Value(0),
  };

  handleIndexChange = (index) => this.setState({ index });

  animate = (toValue) =>
    Animated.spring(this.state.animatedValue, {
      toValue,
      useNativeDriver: true,
      tension: 30,
      friction: 7,
    }).start();

  render() {
    return (
      <SafeAreaView>
        <StyledGreenView>
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
                      showAddPrayerCard={this.state.showAddPrayerCard}
                      component={null}
                    />
                  );
                });
                return scenes[route.key];
              }}
              renderTabBar={(props) => (
                <StyledFeed
                  content={this.props.categories}
                  renderItem={({ item }) => (
                    <TouchableScale
                      key={item.key}
                      onPress={() => {
                        if (this.state.showAddPrayerCard) {
                          this.animate(1);
                          this.setState({
                            showAddPrayerCard: false,
                          });
                        }
                        this.setState({ prayerMenuItemSelected: item.key });
                        props.jumpTo(item.key);
                      }}
                    >
                      <PrayerMenuCard
                        image={item.image}
                        overlayColor={item.overlayColor}
                        title={item.title}
                        selected={
                          this.state.prayerMenuItemSelected === item.key
                        }
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
        </StyledGreenView>
      </SafeAreaView>
    );
  }
}

export default PrayerMenu;
