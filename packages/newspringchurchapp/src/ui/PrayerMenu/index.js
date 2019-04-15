import React from 'react';
import { View } from 'react-native';
import { H3, HorizontalTileFeed, styled } from '@apollosproject/ui-kit';
import PrayerMenuCard from '../PrayerMenuCard';

const RowHeader = styled(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  zIndex: 2, // UX hack to improve tapability. Positions RowHeader above StyledHorizontalTileFeed
  paddingTop: theme.sizing.baseUnit * 0.5,
  paddingLeft: theme.sizing.baseUnit * 0.5,
  paddingBottom: theme.sizing.baseUnit * 1.25,
}))(View);

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
    link: 'https://github.com',
    overlayColor: ['#6BAC43', '#6BAC43'],
    title: 'My Saved Prayers',
  },
  {
    id: '2',
    description: 'Pray for the people in our church',
    image: 'https://picsum.photos/600/400/?random',
    link: 'https://github.com',
    overlayColor: ['#6BAC43', '#6BAC43'],
    title: 'My Church',
  },
  {
    id: '3',
    description: 'Pray for the people at your campus',
    image: 'https://picsum.photos/600/400/?random',
    link: 'https://github.com',
    overlayColor: ['#6BAC43', '#6BAC43'],
    title: 'My Campus',
  },
  {
    id: '4',
    description: 'Pray for those people in your community',
    image: 'https://picsum.photos/600/400/?random',
    link: 'https://github.com',
    overlayColor: ['#6BAC43', '#6BAC43'],
    title: 'My Community',
  },
  {
    id: '5',
    description: 'Revisit your prayers',
    image: 'https://picsum.photos/600/400/?random',
    link: 'https://github.com',
    overlayColor: ['#6BAC43', '#6BAC43'],
    title: 'My Prayers',
  },
];

const PrayerMenu = () => (
  <>
    <RowHeader>
      <H3>Pray for Others</H3>
    </RowHeader>
    <HorizontalTileFeed
      content={prayerMenuData}
      renderItem={({ item }) => (
        <PrayerMenuCard
          image={item.image}
          link={item.link}
          overlayColor={item.overlayColor}
          title={item.title}
        />
      )}
      loadingStateObject={loadingStateObject}
    />
  </>
);

export default PrayerMenu;
