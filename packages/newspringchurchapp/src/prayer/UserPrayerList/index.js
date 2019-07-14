import React from 'react';
import { Mutation, Query } from 'react-apollo';
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
import PrayerSingle from '../PrayerSingle';
import GET_USER_PRAYERS from '../data/queries/getUserPrayers';
import DELETE_PRAYER from '../data/mutations/deletePrayer';
import ActionComponent from './ActionComponent';

const FlexedSafeAreaView = styled({
  flex: 1,
})(SafeAreaView);

const StyledView = styled(({ theme }) => ({
  marginBottom: theme.sizing.baseUnit * 4,
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
          <ScrollView>
            <Query query={GET_USER_PRAYERS} fetchPolicy="cache-and-network">
              {({ data: { userPrayers = [] } = {} }) => (
                <>
                  <PaddedView>
                    <H6>Viewing</H6>
                    <GreenH4>My Prayers</GreenH4>
                  </PaddedView>
                  <Mutation
                    mutation={DELETE_PRAYER}
                    update={(cache, { data: { deletePrayer } }) => {
                      const data = cache.readQuery({
                        query: GET_USER_PRAYERS,
                      });
                      const { id } = deletePrayer;
                      const updatedPrayers = data.userPrayers.filter(
                        (prayer) => prayer.id !== id
                      );
                      cache.writeQuery({
                        query: GET_USER_PRAYERS,
                        data: { userPrayers: updatedPrayers },
                      });
                    }}
                  >
                    {(deletePrayer) => (
                      <StyledView>
                        {userPrayers.map((prayer) => (
                          <Card key={prayer.id}>
                            <CardContent>
                              <PrayerSingle
                                prayer={prayer}
                                showDate
                                action={
                                  <ActionComponent
                                    options={[
                                      {
                                        title: 'Delete Prayer',
                                        method: async () => {
                                          await deletePrayer({
                                            variables: {
                                              parsedId: prayer.id,
                                            },
                                          });
                                        },
                                        destructive: true,
                                      },
                                      {
                                        title: 'Cancel',
                                        method: null,
                                        destructive: false,
                                      },
                                    ]}
                                  />
                                }
                              />
                            </CardContent>
                          </Card>
                        ))}
                      </StyledView>
                    )}
                  </Mutation>
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
