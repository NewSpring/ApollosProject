import React from 'react';
import { PropTypes } from 'prop-types';
import { Query } from 'react-apollo';
import { get } from 'lodash';

import cache from '../../client/cache';
import getUserProfile from '../../tabs/connect/getUserProfile';
import GET_GROUP_PRAYERS from '../data/queries/getGroupPrayers';
import GET_PRAYERS from '../data/queries/getPrayers';
import GET_CAMPUS_PRAYERS from '../data/queries/getCampusPrayers';
import PrayerTab from './PrayerTab';

class PrayerTabConnected extends React.Component {
  static propTypes = {
    category: PropTypes.shape({
      id: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
      overlayColor: PropTypes.arrayOf(PropTypes.string),
      title: PropTypes.string,
      key: PropTypes.string,
    }),
    categoryKey: PropTypes.string,
  };

  static navigationOptions = {
    header: null,
  };

  calculateQuery = () => {
    const { key } = this.props.categoryKey;

    let query;
    let queryName;
    let type;
    let variables;

    switch (key) {
      case 'my-community':
        query = GET_GROUP_PRAYERS;
        queryName = 'groupPrayers';
        type = 'community';
        break;
      case 'my-church':
        query = GET_PRAYERS;
        queryName = 'prayers';
        type = 'church';
        break;
      case 'my-campus': {
        const {
          currentUser: { profile: { campus: { id } = {} } = {} } = {},
        } = cache.readQuery({
          query: getUserProfile,
        });
        query = GET_CAMPUS_PRAYERS;
        queryName = 'campusPrayers';
        type = 'campus';
        variables = { campusId: id };
        break;
      }
      default:
        query = GET_PRAYERS;
        queryName = 'getPrayers';
        type = 'church';
        break;
    }
    return { query, queryName, type, variables };
  };

  render() {
    const { query, queryName, type, variables } = this.calculateQuery();
    const { category } = this.props;
    return (
      <Query
        query={query}
        variables={variables}
        fetchPolicy="cache-and-network"
      >
        {({ data }) => {
          const prayers = get(data, queryName, []);
          return (
            <PrayerTab
              prayers={prayers}
              description={category.description}
              route={category.route}
              title={category.title}
              type={type}
              {...this.props}
            />
          );
        }}
      </Query>
    );
  }
}

PrayerTabConnected.displayName = 'PrayerCardConnected';

export default PrayerTabConnected;
