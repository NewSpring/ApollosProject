import React, { PureComponent } from 'react';
import { View, Dimensions } from 'react-native';
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
import NSIcon from '../ui/NSIcon';
import { AddPrayerCardConnected } from './AddPrayer/AddPrayerCard';
import PrayerMenuCard from './PrayerMenuCard';
import UserPrayerList from './UserPrayerList';
import PrayerPreviewCard from './PrayerPreviewCard';
import SavedPrayerList from './SavedPrayerList';

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

// TODO: this needs to be dynamic at some point
const prayerMenuData = [
  {
    id: '1',
    description: 'Pray for the prayers you haved saved',
    image: 'https://picsum.photos/600/400/?random',
    overlayColor: ['#6BAC43', '#6BAC43'],
    title: 'My Saved Prayers',
    key: 'saved',
    component: <SavedPrayerList />,
  },
  {
    id: '2',
    description: 'Pray for the people in our church',
    image: 'https://picsum.photos/600/400/?random',
    overlayColor: ['#6BAC43', '#6BAC43'],
    title: 'My Church',
    key: 'church',
    component: (
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
        route={'ChurchPrayerList'}
      />
    ),
  },
  {
    id: '3',
    description: 'Pray for the people at your campus',
    image: 'https://picsum.photos/600/400/?random',
    overlayColor: ['#6BAC43', '#6BAC43'],
    title: 'My Campus',
    key: 'campus',
    component: (
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
        route={'CampusPrayerList'}
      />
    ),
  },
  {
    id: '4',
    description: 'Pray for those people in your community',
    image: 'https://picsum.photos/600/400/?random',
    overlayColor: ['#6BAC43', '#6BAC43'],
    title: 'My Community',
    key: 'community',
    component: (
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
        route={'GroupPrayerList'}
      />
    ),
  },
  {
    id: '5',
    description: 'Revisit your prayers',
    image: 'https://picsum.photos/600/400/?random',
    overlayColor: ['#6BAC43', '#6BAC43'],
    title: 'My Prayers',
    key: 'prayers',
    component: <UserPrayerList />,
  },
];

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
}))(View);

const StyledAddPrayerContainer = styled(({ theme }) => ({
  marginTop: theme.sizing.baseUnit,
}))(View);

const Tab = ({ index, showAddPrayerCard }) => {
  const data = prayerMenuData[index - 1];
  return (
    <>
      <StyledPaddedView>
        <BodyText>{data.description}</BodyText>
      </StyledPaddedView>
      {!showAddPrayerCard ? <StyledView>{data.component}</StyledView> : null}
    </>
  );
};

Tab.propTypes = {
  index: PropTypes.number,
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
        title: 'My Saved Prayers',
        key: 'saved',
      },
      {
        title: 'My Church',
        key: 'church',
      },
      {
        title: 'My Campus',
        key: 'campus',
      },
      {
        title: 'My Community',
        key: 'community',
      },
      {
        title: 'My Prayers',
        key: 'prayers',
      },
    ],
    prayerMenuItemSelected: 1,
    showAddPrayerCard: true,
  };

  tabRoute = (index) => () => (
    <Tab index={index} showAddPrayerCard={this.state.showAddPrayerCard} />
  );

  handleIndexChange = (index) => this.setState({ index });

  renderTabBar = (props) => (
    <StyledFeed
      content={prayerMenuData}
      renderItem={({ item }) => (
        <TouchableScale
          key={item.key}
          onPress={() => {
            this.setState({
              prayerMenuItemSelected: item.key,
              showAddPrayerCard: false,
            });
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

  render() {
    return (
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
        ) : null}
        {!this.state.showAddPrayerCard ? (
          <StyledContainer>
            <NSIcon
              onPress={() => {
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
                this.setState({
                  showAddPrayerCard: true,
                  prayerMenuItemSelected: 1,
                });
              }}
            >
              Add your prayer
            </StyledButtonLink>
          </StyledContainer>
        ) : null}
        <RowHeader>
          <H3>Pray for Others</H3>
        </RowHeader>
        <TabView
          initialLayout={{
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
          }}
          navigationState={{ ...this.state }}
          renderScene={SceneMap({
            saved: this.tabRoute(1),
            church: this.tabRoute(2),
            campus: this.tabRoute(3),
            community: this.tabRoute(4),
            prayers: this.tabRoute(5),
          })}
          renderTabBar={this.renderTabBar}
          onIndexChange={this.handleIndexChange}
          swipeEnabled={false}
        />
      </SafeAreaView>
    );
  }
}

const enhance = compose(
  withTheme(({ theme, tint }) => ({
    tint: tint || theme.colors.text.tertiary,
  }))
);

export default enhance(PrayerMenu);
