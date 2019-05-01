import React, { PureComponent } from 'react';
import { View, Dimensions } from 'react-native';
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
import UserPrayerList from './UserPrayer';
import PrayerPreviewCard from './PrayerPreviewCard';
import SavedPrayerList from './SavedPrayer';

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

// TODO: remove once this is pulling data
const PrayerPreviewCardComponent = ({ route }) => (
  <PrayerPreviewCard
    imageSource={{
      uri: 'https://fillmurray.com/400/600',
    }}
    name={'Bill'}
    overlayColor={['#FFF', '#FFF']}
    prayer={
      'I’m alright. Nobody worry ’bout me. Why you got to gimme a fight? Can’t you just let it be?'
    }
    source={'Anderson'}
    route={route}
  />
);
PrayerPreviewCardComponent.propTypes = {
  route: PropTypes.string,
};
// TODO: remove once this is pulling data
const StyledPrayerPreviewCardComponent = styled({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
})(PrayerPreviewCardComponent);

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
    component: <StyledPrayerPreviewCardComponent route={'ChurchPrayerList'} />,
  },
  {
    id: '3',
    description: 'Pray for the people at your campus',
    image: 'https://picsum.photos/600/400/?random',
    overlayColor: ['#6BAC43', '#6BAC43'],
    title: 'My Campus',
    key: 'campus',
    component: <PrayerPreviewCardComponent route={'CampusPrayerList'} />,
  },
  {
    id: '4',
    description: 'Pray for those people in your community',
    image: 'https://picsum.photos/600/400/?random',
    overlayColor: ['#6BAC43', '#6BAC43'],
    title: 'My Community',
    key: 'community',
    component: <PrayerPreviewCardComponent route={'GroupPrayerList'} />,
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

const StyledView = styled(() => ({
  height: Dimensions.get('window').height * 0.4,
  justifyContent: 'flex-end',
}))(View);

const StyledButtonLink = styled(({ theme }) => ({
  textAlign: 'center',
  color: theme.colors.text.tertiary,
}))(ButtonLink);

const StyledContainer = styled(({ theme }) => ({
  alignItems: 'center',
  marginTop: theme.sizing.baseUnit * 3,
  marginBottom: theme.sizing.baseUnit * 2,
}))(View);

const StyledAddPrayerContainer = styled(({ theme }) => ({
  marginTop: theme.sizing.baseUnit * 6,
}))(View);

const Tab = ({ index, showAddPrayerCard }) => {
  const data = prayerMenuData[index - 1];
  return (
    <StyledPaddedView>
      <BodyText>{data.description}</BodyText>
      {!showAddPrayerCard ? <StyledView>{data.component}</StyledView> : null}
    </StyledPaddedView>
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
      <>
        {this.state.showAddPrayerCard ? (
          <StyledAddPrayerContainer>
            <AddPrayerCardConnected {...this.props} />
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
        />
      </>
    );
  }
}

const enhance = compose(
  withTheme(({ theme, tint }) => ({
    tint: tint || theme.colors.text.tertiary,
  }))
);

export default enhance(PrayerMenu);
