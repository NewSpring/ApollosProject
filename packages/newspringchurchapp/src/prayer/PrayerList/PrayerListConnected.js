import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import getUserProfile from '../../tabs/connect/getUserProfile';
import GET_GROUP_PRAYERS from '../data/queries/getGroupPrayers';
import GET_PRAYERS from '../data/queries/getPrayers';
import GET_CAMPUS_PRAYERS from '../data/queries/getCampusPrayers';
import GET_SAVED_PRAYERS from '../data/queries/getSavedPrayers';
import PrayerTab from '../PrayerTab';

const PrayerListConnected = memo(({ list }) => {
  switch (list) {
    case 'saved':
      return (
        <Query query={GET_SAVED_PRAYERS} fetchPolicy="cache-and-network">
          {({ data: { savedPrayers = [] } = {} }) => (
            <PrayerTab
              prayers={savedPrayers}
              query={GET_SAVED_PRAYERS}
              description={'Pray for your saved prayers'}
              list={'SavedPrayerList'}
              title={'My Saved Prayers'}
              type={'saved'}
            />
          )}
        </Query>
      );
    case 'campus':
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
                {({ data: { campusPrayers = [] } = {} }) => (
                  <PrayerTab
                    query={GET_CAMPUS_PRAYERS}
                    prayers={campusPrayers}
                    description={'Pray for the people at your campus'}
                    list={'CampusPrayerList'}
                    title={'My Campus'}
                    type={'campus'}
                  />
                )}
              </Query>
            );
          }}
        </Query>
      );
    case 'community':
      return (
        <Query query={GET_GROUP_PRAYERS} fetchPolicy="cache-and-network">
          {({ data: { groupPrayers = [] } = {} }) => (
            <PrayerTab
              prayers={groupPrayers}
              query={GET_GROUP_PRAYERS}
              description={'Pray for those people in your community'}
              list={'GroupPrayerList'}
              title={'My Community'}
              type={'community'}
            />
          )}
        </Query>
      );
    default:
      return (
        <Query query={GET_PRAYERS} fetchPolicy="cache-and-network">
          {({ data: { prayers = [] } = {} }) => (
            <PrayerTab
              prayers={prayers}
              query={GET_PRAYERS}
              description={'Pray for the people in our church'}
              list={'ChurchPrayerList'}
              title={'My Church'}
              type={'church'}
            />
          )}
        </Query>
      );
  }
});

PrayerListConnected.propTypes = {
  list: PropTypes.oneOf(['church', 'campus', 'community', 'saved']),
};

PrayerListConnected.defaultProps = {
  list: 'church',
};

PrayerListConnected.displayName = 'PrayerListConnected';

export default PrayerListConnected;
