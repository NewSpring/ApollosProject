import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import GET_PRAYER_MENU_CATEGORIES from './data/queries/getPrayerMenuCategories';
import PrayerMenu from './PrayerMenu';

class PrayerMenuConnected extends PureComponent {
  static navigationOptions = () => ({
    title: 'Prayer',
    header: null,
  });

  render() {
    return (
      <Query query={GET_PRAYER_MENU_CATEGORIES}>
        {({ loading, data: { prayerMenuCategories } }) => {
          if (loading) return null;
          const categories = prayerMenuCategories.map((category) => ({
            id: category.id,
            description: category.subtitle,
            image: category.imageURL,
            overlayColor: [category.overlayColor, category.overlayColor],
            title: category.title,
            key: category.key,
          }));
          return <PrayerMenu categories={categories} {...this.props} />;
        }}
      </Query>
    );
  }
}

export default PrayerMenuConnected;
