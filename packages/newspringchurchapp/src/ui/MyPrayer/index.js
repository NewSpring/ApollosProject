import React, { PureComponent } from 'react';
// import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Query } from 'apollo-graphql';

import {
  PaddedView,
  Card,
  CardContent,
  styled,
  H5,
  withIsLoading,
} from '@apollosproject/ui-kit';

import MyPrayerCard from './MyPrayerCard';
import getMyPrayers from './getMyPrayers';

const Header = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.paper,
}))(CardContent);

const Content = styled(() => ({
  borderBottomWidth: 0,
  borderTopWidth: 0,
}))(PaddedView);

class MyPrayers extends PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool, // eslint-disable-line
    content: PropTypes.array, // eslint-disable-line
  };

  render() {
    const { isLoading, content } = this.props;

    return (
      <Card>
        <Header>
          <H5>My Prayers</H5>
        </Header>
        <Content>
          <Query query={getMyPrayers}>
            {content.map((item) => (
              <MyPrayerCard
                isLoading={isLoading}
                key={item.id}
                id={item.id}
                duration={item.duration}
                text={item.text}
              />
            ))}
          </Query>
        </Content>
      </Card>
    );
  }
}

export default withIsLoading(MyPrayers);
