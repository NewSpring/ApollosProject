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
  marginTop: theme.sizing.baseUnit * 0.5,
  marginBottom: theme.sizing.baseUnit * 2,
}))(View);

const AddPrayerCard = memo(({ imgSrc, title, description, ...props }) => (
  <Card>
    <StyledCardContent>
      <Avatar
        source={imgSrc}
        size={'medium'}
        containerStyle={{ marginRight: 0 }}
      />
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
  imgSrc: PropTypes.shape({
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
