import React, { PureComponent } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Emoji from 'react-native-emoji';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

import {
  BodyText,
  H4,
  H6,
  ModalView,
  ChannelLabel,
  FlexedView,
  Button,
  ButtonLink,
  styled,
} from '@apollosproject/ui-kit';

import PrayerSingle from 'newspringchurchapp/src/prayer/PrayerSingle';
import cache from '../../client/cache';
import FLAG_PRAYER from '../data/mutations/flagPrayer';
import INCREMENT_PRAYER_COUNT from '../data/mutations/incrementPrayerCount';

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

  render() {
    const { title, prayers, query } = this.props.navigation.state.params;
    const prayer = prayers[this.state.prayerIndex];
    const isLastPrayer = this.state.prayerIndex + 1 === prayers.length;

    return (
      <ModalView onClose={() => this.props.navigation.popToTop()}>
        <FlexedSafeAreaView>
          <Mutation
            mutation={FLAG_PRAYER}
            update={() => {
              const filteredPrayers = prayers.filter(
                (filteredPrayer) => filteredPrayer.id !== prayer.id
              );
              cache.writeQuery({
                query,
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
                          <GreenH4>{title}</GreenH4>
                        </Header>
                        <StyledPrayerView>
                          <PrayerSingle
                            avatarSize={'medium'}
                            navigation={this.props.navigation}
                            prayer={prayer}
                            action={
                              // TODO: save button component, stateful
                              <Button>
                                <ChannelLabel
                                  icon="like-solid"
                                  label="Unsave"
                                />
                              </Button>
                            }
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
                              prayer.isAnonymous ? 'request' : prayer.firstName
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
                              <FooterText isGray>Report Prayer</FooterText>
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
                                    prayerIndex: prevState.prayerIndex + 1,
                                    prayed: false,
                                  }))
                                : this.props.navigation.popToTop()
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
        </FlexedSafeAreaView>
      </ModalView>
    );
  }
}

export default PrayerList;
