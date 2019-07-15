import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import getUserProfile from '../../tabs/connect/getUserProfile';
import GET_GROUP_PRAYERS from '../data/queries/getGroupPrayers';
import GET_PRAYERS from '../data/queries/getPrayers';
import GET_CAMPUS_PRAYERS from '../data/queries/getCampusPrayers';
import GET_SAVED_PRAYERS from '../data/queries/getSavedPrayers';
import PrayerTab from '../PrayerTab';

const PrayerListQuery = memo(({ route }) => {
  switch (route.key) {
    case 'my-saved-prayers':
      return (
        <Query query={GET_SAVED_PRAYERS} fetchPolicy="cache-and-network">
          {({ data }) => (
            <PrayerTab
              prayers={Object.values(data)[0]}
              description={route.description}
              title={route.title}
              type={route.key.split('-')[1]}
            />
          )}
        </Query>
      );
    case 'my-campus':
      return (
        <Query query={getUserProfile}>
          {({
            data: {
              currentUser: { profile: { campus: { id } = {} } = {} } = {},
            } = {},
            loading,
          }) => {
            if (loading) return null;
            return (
              <Query
                query={GET_CAMPUS_PRAYERS}
                variables={{ campusId: id }}
                fetchPolicy="cache-and-network"
              >
                {({ data }) => (
                  <PrayerTab
                    prayers={Object.values(data)[0]}
                    description={route.description}
                    title={route.title}
                    type={route.key.split('-')[1]}
                  />
                )}
              </Query>
            );
          }}
        </Query>
      );
    case 'my-community':
      return (
        <Query query={GET_GROUP_PRAYERS} fetchPolicy="cache-and-network">
          {({ data }) => (
            <PrayerTab
              prayers={Object.values(data)[0]}
              description={route.description}
              title={route.title}
              type={route.key.split('-')[1]}
            />
          )}
        </Query>
      );
    default:
      return (
        <Query query={GET_PRAYERS} fetchPolicy="cache-and-network">
          {({ data } = {}) => (
            <PrayerTab
              prayers={Object.values(data)[0]}
              description={route.description}
              title={route.title}
              type={route.key.split('-')[1]}
            />
          )}
        </Query>
      );
  }
});

PrayerListQuery.propTypes = {
  route: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    key: PropTypes.oneOf([
      'my-church',
      'my-campus',
      'my-community',
      'my-saved-prayers',
    ]),
  }),
};

PrayerListQuery.defaultProps = {
  route: {
    title: 'My Church',
    description: 'Pray for the people in our church',
    key: 'my-church',
  },
};

PrayerListQuery.displayName = 'PrayerListQuery';

export default PrayerListQuery;
