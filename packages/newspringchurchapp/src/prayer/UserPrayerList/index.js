import React from 'react';
import { Query } from 'react-apollo';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {
  Card,
  CardContent,
  H4,
  H6,
  ModalView,
  PaddedView,
  styled,
} from '@apollosproject/ui-kit';
import PrayerCard from '../PrayerCard';
import GET_USER_PRAYERS from '../data/queries/getUserPrayers';

const FlexedSafeAreaView = styled({
  flex: 1,
})(SafeAreaView);

const StyledView = styled(({ theme }) => ({
  marginBottom: theme.sizing.baseUnit * 4,
}))(View);

const Header = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit * 2,
}))(View);

const GreenH4 = styled(({ theme }) => ({
  color: theme.colors.primary,
}))(H4);

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
                <>
                  <PaddedView>
                    <H6>Viewing</H6>
                    <GreenH4>My Prayers</GreenH4>
                  </PaddedView>
                  <StyledView>
                    {userPrayers
                      .map((prayer) => (
                        // TODO: Pass all the right things to the prayer card
                        // once it's done being refactored.
                        <Card key={prayer.id}>
                          <CardContent>
                            <PrayerCard
                              prayer={prayer}
                              showHelp={false}
                              header={false}
                            />
                          </CardContent>
                        </Card>
                      ))
                      .reverse()}
                  </StyledView>
                </>
              )}
            </Query>
          </ScrollView>
        </FlexedSafeAreaView>
      </ModalView>
    );
  }
}

export default UserPrayerList;
