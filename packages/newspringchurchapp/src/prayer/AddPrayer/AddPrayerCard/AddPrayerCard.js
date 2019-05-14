import React, { memo } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import {
  BodyText,
  styled,
  Button,
  Card,
  CardContent,
  PaddedView,
} from '@apollosproject/ui-kit';
import PrayerHeader from '../../PrayerHeader';

const StyledCardContent = styled(({ theme }) => ({
  alignItems: 'center',
  marginTop: theme.sizing.baseUnit,
}))(CardContent);

const StyledBodyText = styled(() => ({
  textAlign: 'center',
}))(BodyText);

const StyledPrayerHeaderView = styled(({ theme }) => ({
  marginBottom: theme.sizing.baseUnit,
}))(View);

const AddPrayerCard = memo(({ avatarSource, title, description, ...props }) => (
  <Card>
    <StyledCardContent>
      <StyledPrayerHeaderView>
        <PrayerHeader
          avatarSource={avatarSource}
          avatarSize={'medium'}
          name={title}
        />
      </StyledPrayerHeaderView>
      <StyledBodyText>{description}</StyledBodyText>
    </StyledCardContent>
    <PaddedView>
      <Button
        title={'Add Prayer'}
        onPress={() => props.navigation.navigate('AddPrayerFormConnected')}
      />
    </PaddedView>
  </Card>
));

AddPrayerCard.propTypes = {
  avatarSource: PropTypes.shape({
    uri: PropTypes.string,
  }),
  title: PropTypes.string,
  description: PropTypes.string,
};

AddPrayerCard.defaultProps = {
  title: 'Ask for prayer',
  description:
    "There aren't currently any prayers in your community. Send them one now.",
};

AddPrayerCard.displayName = 'AddPrayerCard';

export default AddPrayerCard;
