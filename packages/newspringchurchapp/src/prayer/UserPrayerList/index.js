import React from 'react';
import { Query } from 'react-apollo';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { ModalView, styled } from '@apollosproject/ui-kit';
import PrayerCard from '../PrayerCard';
import GET_USER_PRAYERS from '../data/queries/getUserPrayers';

const FlexedSafeAreaView = styled({
  flex: 1,
})(SafeAreaView);

const StyledView = styled(({ theme }) => ({
  marginBottom: theme.sizing.baseUnit * 4,
}))(View);

class UserPrayerList extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <ModalView {...this.props} onClose={() => this.props.navigation.pop()}>
        <FlexedSafeAreaView forceInset={{ top: 'always' }}>
          <ScrollView nestedScrollEnabled>
            <Query query={GET_USER_PRAYERS} fetchPolicy="cache-and-network">
              {({ data: { userPrayers = [] } = {} }) => (
                <StyledView>
                  {userPrayers
                    .map((prayer) => (
                      // TODO: Pass all the right things to the prayer card
                      // once it's done being refactored.
                      <PrayerCard
                        key={prayer.id}
                        prayer={prayer}
                        showHelp={false}
                        header={false}
                      />
                    ))
                    .reverse()}
                </StyledView>
              )}
            </Query>
          </ScrollView>
        </FlexedSafeAreaView>
      </ModalView>
    );
  }
}

export default UserPrayerList;
