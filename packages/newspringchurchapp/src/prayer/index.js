import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { ActivityIndicator } from '@apollosproject/ui-kit';
import { client } from '../client';
import GET_USER_PROFILE from '../tabs/connect/getUserProfile';
import GET_PRAYER_MENU_CATEGORIES from './data/queries/getPrayerMenuCategories';
import PrayerMenu from './PrayerMenu';

class PrayerMenuConnected extends PureComponent {
  static navigationOptions = () => ({
    title: 'Prayer',
    header: null,
  });

  state = {
    userCampusID: null,
  };

  async componentDidMount() {
    const {
      data: {
        currentUser: { profile: { campus: { id = '' } = {} } = {} } = {},
      } = {},
    } = await client.query({ query: GET_USER_PROFILE });
    this.setState({ userCampusID: id });
  }

  render() {
    return (
      <Query query={GET_PRAYER_MENU_CATEGORIES}>
        {({ loading, data: { prayerMenuCategories } = {} }) => {
          if (loading) return <ActivityIndicator />;
          const categories = prayerMenuCategories.map((category) => ({
            id: category.id,
            description: category.subtitle,
            image: category.imageURL,
            title: category.title,
            key: category.key,
          }));
          return (
            <PrayerMenu
              categories={categories}
              campusID={this.state.userCampusID}
              {...this.props}
            />
          );
        }}
      </Query>
    );
  }
}

export default PrayerMenuConnected;
