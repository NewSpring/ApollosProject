import React, { PureComponent } from 'react';
import { View, Dimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import {
  H3,
  HorizontalTileFeed,
  styled,
  TouchableScale,
  PaddedView,
  BodyText,
  ButtonLink,
  withTheme,
} from '@apollosproject/ui-kit';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Query } from 'react-apollo';
import NSIcon from '../ui/NSIcon';
import { AddPrayerCardConnected } from './AddPrayer/AddPrayerCard';
import PrayerMenuCard from './PrayerMenuCard';
import UserPrayerList from './UserPrayerList';
import PrayerPreviewCard from './PrayerPreviewCard';
import SavedPrayerList from './SavedPrayerList';
import PRAYER_MENU_CATEGORIES from './data/queries/getPrayerMenuCategories';

const RowHeader = styled(() => ({
  zIndex: 2, // UX hack to improve tapability. Positions RowHeader above StyledHorizontalTileFeed
}))(PaddedView);

const loadingStateObject = {
  node: {
    id: 'fakeId0',
    title: '',
    isLoading: true,
  },
};

// used by PrayerList.js to determine what list shows when "Start Praying" is clicked
const prayerLists = {
  'my-church': 'ChurchPrayerList',
  'my-campus': 'CampusPrayerList',
  'my-community': 'GroupPrayerList',
};

// TODO: prayer preview cards should use the first one in the list
const getCategoryComponent = (key) => {
  switch (key) {
    case 'my-saved-prayers':
      return <SavedPrayerList />;
    case 'my-church':
      return (
        <PrayerPreviewCard
          avatarSource={{
            uri: 'https://rock.newspring.cc/GetImage.ashx?id=564401',
          }}
          avatarSize={'medium'}
          name={'Dan'}
          overlayColor={['#FFF', '#FFF']}
          prayer={
            'Pray that our church becomes activated and that we allow the Holy Spirit to drive what we do.'
          }
          source={'Anderson'}
          route={prayerLists[key]}
        />
      );
    case 'my-campus':
      return (
        <PrayerPreviewCard
          avatarSource={{
            uri: 'https://rock.newspring.cc/GetImage.ashx?id=564499',
          }}
          avatarSize={'medium'}
          name={'Morgan'}
          overlayColor={['#FFF', '#FFF']}
          prayer={
            'Pray that God will do big things at our Connect table this month.'
          }
          source={'Anderson'}
          route={prayerLists[key]}
        />
      );
    case 'my-community':
      return (
        <PrayerPreviewCard
          avatarSource={{
            uri: 'https://rock.newspring.cc/GetImage.ashx?id=576112',
          }}
          avatarSize={'medium'}
          name={'Devin'}
          overlayColor={['#FFF', '#FFF']}
          prayer={
            'Please pray for Fuse! FSKO is coming and we want God to show up big.'
          }
          source={'Greenwood'}
          route={prayerLists[key]}
        />
      );
    case 'my-prayers':
      return <UserPrayerList />;
    default:
      return null;
  }
};

const StyledFeed = styled(({ theme }) => ({
  paddingLeft: theme.sizing.baseUnit,
}))(HorizontalTileFeed);

const StyledPaddedView = styled(({ theme }) => ({
  marginTop: theme.sizing.baseUnit,
}))(PaddedView);

const StyledView = styled(({ theme }) => ({
  height: Dimensions.get('window').height * 0.4,
  justifyContent: 'flex-end',
  marginTop: theme.sizing.baseUnit,
}))(View);

const StyledButtonLink = styled(({ theme }) => ({
  textAlign: 'center',
  color: theme.colors.text.tertiary,
}))(ButtonLink);

const StyledContainer = styled(({ theme }) => ({
  alignItems: 'center',
  marginTop: theme.sizing.baseUnit,
  marginBottom: theme.sizing.baseUnit,
}))(View);

const StyledAddPrayerContainer = styled(({ theme }) => ({
  marginTop: theme.sizing.baseUnit,
}))(View);

const Tab = ({ description, component, showAddPrayerCard }) => (
  <>
    <StyledPaddedView>
      <BodyText>{description}</BodyText>
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
  static navigationOptions = () => ({
    title: 'Prayer',
    header: null,
  });

  static propTypes = {
    tint: PropTypes.string,
  };

  state = {
    index: 0,
    routes: [
      {
        key: 'my-saved-prayers',
      },
      {
        key: 'my-church',
      },
      {
        key: 'my-campus',
      },
      {
        key: 'my-community',
      },
      {
        key: 'my-prayers',
      },
    ],
    categories: [],
    prayerMenuItemSelected: 1,
    showAddPrayerCard: true,
    animatedValue: new Animated.Value(0),
  };

  animate = (toValue) =>
    Animated.spring(this.state.animatedValue, {
      toValue,
      useNativeDriver: true,
      tension: 30,
      friction: 7,
    }).start();

  handleIndexChange = (index) => this.setState({ index });

  renderTabBar = (props) => (
    <Query query={PRAYER_MENU_CATEGORIES}>
      {({ data }) => {
        const categories = data.prayerMenuCategories.map((category) => ({
          id: category.id,
          description: category.subtitle,
          image: category.imageURL,
          overlayColor: [category.overlayColor, category.overlayColor],
          title: category.title,
          key: category.key,
          component: getCategoryComponent(category.key),
        }));
        return (
          <StyledFeed
            content={categories}
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
                  selected={this.state.prayerMenuItemSelected === item.key}
                />
              </TouchableScale>
            )}
            loadingStateObject={loadingStateObject}
          />
        );
      }}
    </Query>
  );

  render() {
    return (
      <Animated.View
        style={{
          transform: [
            {
              translateY: this.state.animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -(350 * this.state.showAddPrayerCard)],
              }),
            },
          ],
        }}
      >
        <SafeAreaView>
          {this.state.showAddPrayerCard ? (
            <StyledAddPrayerContainer>
              <AddPrayerCardConnected
                description={
                  'Take a moment to send a prayer request that your NewSpring Church family can pray for.'
                }
                {...this.props}
              />
            </StyledAddPrayerContainer>
          ) : (
            <StyledContainer>
              <NSIcon
                onPress={() => {
                  this.animate(0);

                  this.setState({
                    showAddPrayerCard: true,
                    prayerMenuItemSelected: 1,
                  });
                }}
                name={'arrow-up'}
                fill={this.props.tint}
                size={24}
              />
              <StyledButtonLink
                onPress={() => {
                  this.animate(0);

                  this.setState({
                    showAddPrayerCard: true,
                    prayerMenuItemSelected: 1,
                  });
                }}
              >
                Add your prayer
              </StyledButtonLink>
            </StyledContainer>
          )}
          <RowHeader>
            <H3>Pray for Others</H3>
          </RowHeader>
          <TabView
            initialLayout={{
              height: Dimensions.get('window').height,
              width: Dimensions.get('window').width,
            }}
            // TODO: routes: categories.keys needs to be passed so we don't need state.routes
            navigationState={{ ...this.state }}
            renderScene={({ route }) => {
              const scenes = {
                // TODO: this needs to come from the data call
                'my-saved-prayers': (
                  <Tab
                    description={'saved prayers'}
                    showAddPrayerCard={this.state.showAddPrayerCard}
                    component={getCategoryComponent('my-saved-prayers')}
                  />
                ),
                'my-church': (
                  <Tab
                    description={'church prayers'}
                    showAddPrayerCard={this.state.showAddPrayerCard}
                    component={getCategoryComponent('my-church')}
                  />
                ),
                'my-campus': (
                  <Tab
                    description={'campus prayers'}
                    showAddPrayerCard={this.state.showAddPrayerCard}
                    component={getCategoryComponent('my-campus')}
                  />
                ),
                'my-community': (
                  <Tab
                    description={'community prayers'}
                    showAddPrayerCard={this.state.showAddPrayerCard}
                    component={getCategoryComponent('my-community')}
                  />
                ),
                'my-prayers': (
                  <Tab
                    description={'my prayers'}
                    showAddPrayerCard={this.state.showAddPrayerCard}
                    component={getCategoryComponent('my-prayers')}
                  />
                ),
              };
              return scenes[route.key];
            }}
            renderTabBar={this.renderTabBar}
            onIndexChange={this.handleIndexChange}
            swipeEnabled={false}
          />
        </SafeAreaView>
      </Animated.View>
    );
  }
}

const enhance = compose(
  withTheme(({ theme, tint }) => ({
    tint: tint || theme.colors.text.tertiary,
  }))
);

export default enhance(PrayerMenu);
