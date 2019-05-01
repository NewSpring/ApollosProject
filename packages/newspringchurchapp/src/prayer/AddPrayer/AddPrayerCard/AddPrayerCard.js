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
  Avatar,
  H3,
} from '@apollosproject/ui-kit';

const StyledCardContent = styled({
  alignItems: 'center',
})(CardContent);

const TitleView = styled(({ theme }) => ({
  marginBottom: theme.sizing.baseUnit,
}))(View);

const AddPrayerCard = memo(({ avatarSource, title, description, ...props }) => (
  <Card>
    <StyledCardContent>
      {/* TODO: margin will be fixed pending core #667 */}
      <Avatar source={avatarSource} size={'medium'} />
      <TitleView>
        <H3>{title}</H3>
      </TitleView>
      <BodyText>{description}</BodyText>
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
