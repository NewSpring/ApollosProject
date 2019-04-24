import React, { PureComponent } from 'react';
import { View, Dimensions, Text } from 'react-native';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
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
import PrayerPreviewCard from '../../prayer/PrayerPreviewCard';
import AddPrayerCard from '../../prayer/AddPrayer/AddPrayerCard';

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
const PrayerPreviewCardComponent = () => (
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
  />
);
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
  },
  {
    id: '2',
    description: 'Pray for the people in our church',
    image: 'https://picsum.photos/600/400/?random',
    overlayColor: ['#6BAC43', '#6BAC43'],
    title: 'My Church',
    key: 'church',
    component: <StyledPrayerPreviewCardComponent />,
  },
  {
    id: '3',
    description: 'Pray for the people at your campus',
    image: 'https://picsum.photos/600/400/?random',
    overlayColor: ['#6BAC43', '#6BAC43'],
    title: 'My Campus',
    key: 'campus',
    component: <PrayerPreviewCardComponent />,
  },
  {
    id: '4',
    description: 'Pray for those people in your community',
    image: 'https://picsum.photos/600/400/?random',
    overlayColor: ['#6BAC43', '#6BAC43'],
    title: 'My Community',
    key: 'community',
    component: <PrayerPreviewCardComponent />,
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
  height: Dimensions.get('window').height * 0.5,
  marginTop: theme.sizing.baseUnit * 2,
}))(PaddedView);

const StyledView = styled(() => ({
  height: '100%',
  justifyContent: 'flex-end',
}))(View);

const Tab = ({ index }) => {
  const data = prayerMenuData[index - 1];
  return (
    <StyledPaddedView>
      <BodyText>{data.description}</BodyText>
      <StyledView>{data.component}</StyledView>
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
        <Query
          query={gql`
            query {
              currentUser {
                id
                profile {
                  photo {
                    uri
                  }
                }
              }
            }
          `}
          fetchPolicy={'cache-and-network'}
        >
          {({ data }) => (
            <AddPrayerCard
              imgSrc={data.currentUser.profile.photo}
              {...this.props}
            />
          )}
        </Query>
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

export default PrayerMenu;
