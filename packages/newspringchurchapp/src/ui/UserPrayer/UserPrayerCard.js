import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Mutation } from 'react-apollo';

import ActionSheet from 'react-native-actionsheet';
import {
  Card,
  styled,
  CardContent,
  H5,
  BodyText,
  PaddedView,
  SideBySideView,
  ButtonLink,
} from '@apollosproject/ui-kit';

import deleteUserPrayer from './deleteUserPrayer';
import getUserPrayers from './getUserPrayers';

const PrayerText = styled(() => ({
  textAlign: 'center',
}))(BodyText);

const HeaderView = styled(() => ({
  paddingBottom: 0,
}))(PaddedView);

const HorizontalTextLayout = styled(({ theme }) => ({
  height: theme.helpers.verticalRhythm(0.875),
}))(SideBySideView);

class UserPrayerCard extends PureComponent {
  handleShowActionSheet = () => {
    this.ActionSheet.show();
  };

  render() {
    const { duration, text, id, ...otherProps } = this.props;

    const options = ['Remove Prayer Request', 'Cancel'];
    return (
      <Card {...otherProps}>
        <HeaderView>
          <HorizontalTextLayout>
            <H5>{moment(duration).fromNow()}</H5>
            <ButtonLink onPress={this.handleShowActionSheet}>...</ButtonLink>
            <Mutation
              mutation={deleteUserPrayer}
              update={async (
                cache,
                { data: { deletePublicPrayerRequest } }
              ) => {
                await cache.writeQuery({
                  query: getUserPrayers,
                  data: deletePublicPrayerRequest.filter(
                    (prayer) => prayer.id === id
                  ),
                });
              }}
            >
              {(deletePrayer) => (
                <ActionSheet
                  ref={(o) => {
                    this.ActionSheet = o;
                  }}
                  title={'Would you like to remove the prayer request?'}
                  options={options}
                  cancelButtonIndex={1}
                  destructiveButtonindex={0}
                  onPress={() => deletePrayer({ variables: { parsedId: id } })}
                />
              )}
            </Mutation>
          </HorizontalTextLayout>
        </HeaderView>
        <CardContent>
          <PrayerText>{text}</PrayerText>
        </CardContent>
      </Card>
    );
  }
}

UserPrayerCard.propTypes = {
  duration: PropTypes.string.isRequired,
  text: PropTypes.string,
  isLoading: PropTypes.bool,
  id: PropTypes.string,
};

export default UserPrayerCard;
