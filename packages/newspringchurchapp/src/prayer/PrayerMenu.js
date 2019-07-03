import React, { PureComponent } from 'react';
import { Dimensions, View, Animated } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import PropTypes from 'prop-types';
import { TabView } from 'react-native-tab-view';
import {
  TouchableScale,
  HorizontalTileFeed,
  PaddedView,
  styled,
  BodyText,
  H3,
} from '@apollosproject/ui-kit';
import AddPrayerCard from './AddPrayer/AddPrayerCard';
import PrayerMenuCard from './PrayerMenuCard';
import UserPrayerList from './UserPrayerList';
import PrayerPreviewCard from './PrayerPreviewCard';
import SavedPrayerList from './SavedPrayerList';

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
          overlayColor={'#FFF'}
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
          overlayColor={'#FFF'}
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
          overlayColor={'#FFF'}
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

const StyledView = styled({
  height: Dimensions.get('window').height * 0.4,
  justifyContent: 'flex-end',
})(View);

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
        <AddPrayerCard
          description={
            'Take a moment to send a prayer request that your NewSpring Church family can pray for.'
          }
          {...this.props}
        />
        <PaddedView>
          <H3>Pray for Others</H3>
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
                  component={getCategoryComponent(category.key)}
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
      </SafeAreaView>
    );
  }
}

export default PrayerMenu;
