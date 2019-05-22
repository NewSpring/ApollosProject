import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import PRAYER_MENU_CATEGORIES from './data/queries/getPrayerMenuCategories';
import PrayerMenu from './PrayerMenu';

class PrayerMenuConnected extends PureComponent {
  static navigationOptions = () => ({
    title: 'Prayer',
    header: null,
  });

  static propTypes = {
    tint: PropTypes.string,
  };

  render() {
    return (
      <Query query={PRAYER_MENU_CATEGORIES}>
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
          return (
            <PrayerMenu
              categories={categories}
              arrowColor={this.props.tint}
              {...this.props}
            />
          );
        }}
      </Query>
    );
  }
}

export default PrayerMenuConnected;
