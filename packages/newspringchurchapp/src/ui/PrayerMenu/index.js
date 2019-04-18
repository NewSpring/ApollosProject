import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  H3,
  HorizontalTileFeed,
  styled,
  TouchableScale,
  PaddedView,
  BodyText,
} from '@apollosproject/ui-kit';
import { TabView, SceneMap } from 'react-native-tab-view';
import PrayerMenuCard from '../PrayerMenuCard';
import UserPrayerList from '../UserPrayer';

const RowHeader = styled(() => ({
  zIndex: 2, // UX hack to improve tapability. Positions RowHeader above StyledHorizontalTileFeed
}))(PaddedView);

const StyledPaddedView = styled(({ theme }) => ({
  marginTop: theme.sizing.baseUnit,
}))(PaddedView);

const loadingStateObject = {
  node: {
    id: 'fakeId0',
    title: '',
    isLoading: true,
  },
};

const prayerMenuData = [
  {
    id: '1',
    description: 'Pray for the prayers you haved saved',
    image: 'https://picsum.photos/600/400/?random',
    overlayColor: ['#6BAC43', '#6BAC43'],
    title: 'My Saved Prayers',
    key: 'saved',
  },
  {
    id: '2',
    description: 'Pray for the people in our church',
    image: 'https://picsum.photos/600/400/?random',
    overlayColor: ['#6BAC43', '#6BAC43'],
    title: 'My Church',
    key: 'church',
  },
  {
    id: '3',
    description: 'Pray for the people at your campus',
    image: 'https://picsum.photos/600/400/?random',
    overlayColor: ['#6BAC43', '#6BAC43'],
    title: 'My Campus',
    key: 'campus',
  },
  {
    id: '4',
    description: 'Pray for those people in your community',
    image: 'https://picsum.photos/600/400/?random',
    overlayColor: ['#6BAC43', '#6BAC43'],
    title: 'My Community',
    key: 'community',
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

const Tab = ({ index }) => {
  const data = prayerMenuData[index - 1];
  return (
    <StyledPaddedView>
      <BodyText>{data.description}</BodyText>
      <UserPrayerList />
    </StyledPaddedView>
  );
};
Tab.propTypes = {
  index: PropTypes.number,
};

class PrayerMenu extends PureComponent {
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
  };

  tabRoute = (index) => () => <Tab index={index} />;

  handleIndexChange = (index) => this.setState({ index });

  renderTabBar = (props) => (
    <StyledFeed
      content={prayerMenuData}
      renderItem={({ item }) => (
        <TouchableScale key={item.key} onPress={() => props.jumpTo(item.key)}>
          <PrayerMenuCard
            image={item.image}
            overlayColor={item.overlayColor}
            title={item.title}
          />
        </TouchableScale>
      )}
      loadingStateObject={loadingStateObject}
    />
  );

  render() {
    return (
      <>
        <RowHeader>
          <H3>Pray for Others</H3>
        </RowHeader>
        <TabView
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

export default PrayerMenu;
