import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  UIText,
  styled,
  Button,
  CardContent,
  FlexedView,
  H3,
} from '@apollosproject/ui-kit';

const StyledView = styled(({ theme }) => ({
  height: '60%',
  padding: theme.sizing.baseUnit,
  borderBottomLeftRadius: theme.sizing.baseUnit,
}))(FlexedView);

const StyledUIText = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit,
}))(UIText);

const StyledCardContent = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit,
  flex: 1,
}))(CardContent);

const StyledFlexedView = styled(({ theme }) => ({
  padding: theme.sizing.baseUnit,
}))(FlexedView);

const AddPrayerCard = memo(({ avatarSource, title, description, ...props }) => (
  <StyledView>
    <StyledCardContent>
      <H3>{title}</H3>
      <StyledUIText>{description}</StyledUIText>
    </StyledCardContent>
    <StyledFlexedView>
      <Button
        title={'Add Prayer Request'}
        onPress={() => props.navigation.navigate('AddPrayerFormConnected')}
      />
    </StyledFlexedView>
  </StyledView>
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
