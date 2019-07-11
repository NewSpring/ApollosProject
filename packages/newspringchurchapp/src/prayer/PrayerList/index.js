import React, { PureComponent } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Emoji from 'react-native-emoji';
import { Query, Mutation } from 'react-apollo';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import {
  BodyText,
  H4,
  H6,
  ModalView,
  FlexedView,
  Button,
  ButtonLink,
  styled,
} from '@apollosproject/ui-kit';

import PrayerSingle from 'newspringchurchapp/src/prayer/PrayerSingle';
import SaveButton from '../SaveButton';
import cache from '../../client/cache';
import getUserProfile from '../../tabs/connect/getUserProfile';
import FLAG_PRAYER from '../data/mutations/flagPrayer';
import INCREMENT_PRAYER_COUNT from '../data/mutations/incrementPrayerCount';
import GET_GROUP_PRAYERS from '../data/queries/getGroupPrayers';
import GET_PRAYERS from '../data/queries/getPrayers';
import GET_CAMPUS_PRAYERS from '../data/queries/getCampusPrayers';

const FlexedSafeAreaView = styled({
  flex: 1,
})(SafeAreaView);

const ScrollArea = styled(({ theme }) => ({
  flex: 5,
  padding: theme.sizing.baseUnit,
}))(FlexedView);

const Header = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit * 2,
}))(View);

const StyledPrayerView = styled(({ theme }) => ({
  marginTop: theme.sizing.baseUnit * 5,
}))(View);

const GreenH4 = styled(({ theme }) => ({
  color: theme.colors.primary,
}))(H4);

const FooterAltOption = styled(({ theme }) => ({
  alignSelf: 'center',
  padding: theme.sizing.baseUnit,
}))(View);

const FooterText = styled(({ theme, isGray }) => ({
  color: isGray ? theme.colors.text.tertiary : theme.colors.primary,
}))(BodyText);

const Footer = styled(({ theme }) => ({
  justifyContent: 'flex-end',
  padding: theme.sizing.baseUnit,
}))(FlexedView);

class PrayerList extends PureComponent {
  static navigationOptions = {
    header: null,
  };

  state = {
    prayerIndex: 0,
    prayed: false,
  };

  static propTypes = {
    query: PropTypes.oneOf(['prayers', 'groupPrayers', 'campusPrayers']),
  };

  static defaultProps = {
    query: 'prayers',
  };

  // TODO: this may be better pulled from a content channel???
  calculateQuery = () => {
    let queryTag;
    let label;
    let variables;

    switch (this.props.query) {
      case 'groups':
        queryTag = GET_GROUP_PRAYERS;
        label = 'My Community';
        break;
      case 'campus': {
        const {
          currentUser: { profile: { campus: { id } = {} } = {} } = {},
        } = cache.readQuery({
          query: getUserProfile,
        });
        queryTag = GET_CAMPUS_PRAYERS;
        label = 'My Campus';
        variables = { campusId: id };
        break;
      }
      default:
        queryTag = GET_PRAYERS;
        label = 'My Church';
        break;
    }
    return { queryTag, label, variables };
  };

  render() {
    const { queryTag, label, variables } = this.calculateQuery();

    return (
      <ModalView onClose={() => this.props.navigation.pop()}>
        <FlexedSafeAreaView>
          <Query
            query={queryTag}
            variables={variables}
            fetchPolicy="cache-and-network"
          >
            {({ loading, data }) => {
              // TODO: create a pretty loading state
              if (loading) return null;
              const prayers = get(data, this.props.query, []);
              const prayer = prayers[this.state.prayerIndex];
              const isLastPrayer =
                this.state.prayerIndex + 1 === prayers.length;
              return (
                <Mutation
                  mutation={FLAG_PRAYER}
                  update={() => {
                    const filteredPrayers = prayers.filter(
                      (filteredPrayer) => filteredPrayer.id !== prayer.id
                    );
                    cache.writeQuery({
                      query: queryTag,
                      data: { [`${this.props.query}`]: filteredPrayers },
                    });
                  }}
                >
                  {(flagPrayer) => (
                    <Mutation mutation={INCREMENT_PRAYER_COUNT}>
                      {(increment) => (
                        <FlexedView>
                          <ScrollArea>
                            <ScrollView>
                              <Header>
                                <H6>Praying For</H6>
                                <GreenH4>{label}</GreenH4>
                              </Header>
                              <StyledPrayerView>
                                <PrayerSingle
                                  avatarSize={'medium'}
                                  navigation={this.props.navigation}
                                  prayer={prayer}
                                  action={<SaveButton prayerID={prayer.id} />}
                                  showHelp
                                  showHeader
                                />
                              </StyledPrayerView>
                            </ScrollView>
                          </ScrollArea>
                          <Footer>
                            {!this.state.prayed ? (
                              <View>
                                <Button
                                  title={`I've prayed for ${
                                    prayer.isAnonymous
                                      ? 'request'
                                      : prayer.firstName
                                  }`}
                                  onPress={() => {
                                    increment({
                                      variables: { parsedId: prayer.id },
                                    });
                                    this.setState({ prayed: true });
                                  }}
                                />
                                <FooterAltOption>
                                  <ButtonLink
                                    onPress={() =>
                                      flagPrayer({
                                        variables: {
                                          parsedId: prayer.id,
                                        },
                                      })
                                    }
                                  >
                                    <FooterText isGray>
                                      Report Prayer
                                    </FooterText>
                                  </ButtonLink>
                                </FooterAltOption>
                              </View>
                            ) : (
                              <View>
                                <FooterAltOption>
                                  <FooterText>
                                    Thanks for praying <Emoji name="heart" />
                                  </FooterText>
                                </FooterAltOption>
                                <Button
                                  title={!isLastPrayer ? 'Next' : 'Done'}
                                  onPress={() =>
                                    !isLastPrayer
                                      ? this.setState((prevState) => ({
                                          prayerIndex:
                                            prevState.prayerIndex + 1,
                                          prayed: false,
                                        }))
                                      : this.props.navigation.navigate('Prayer')
                                  }
                                />
                              </View>
                            )}
                          </Footer>
                        </FlexedView>
                      )}
                    </Mutation>
                  )}
                </Mutation>
              );
            }}
          </Query>
        </FlexedSafeAreaView>
      </ModalView>
    );
  }
}

export default PrayerList;
