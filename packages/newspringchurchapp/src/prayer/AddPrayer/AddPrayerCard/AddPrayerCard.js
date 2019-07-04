import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  BodyText,
  styled,
  Button,
  CardContent,
  FlexedView,
  SideBySideView,
  ChannelLabel,
  Touchable,
  H3,
} from '@apollosproject/ui-kit';

const StyledView = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit * 4,
  borderBottomLeftRadius: theme.sizing.baseUnit,
  backgroundColor: theme.colors.paper,
}))(FlexedView);

const StyledBodyText = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit,
}))(BodyText);

const StyledCardContent = styled({
  flex: 1,
})(CardContent);

const StyledFlexedView = styled(({ theme }) => ({
  paddingHorizontal: theme.sizing.baseUnit,
}))(FlexedView);

const AddPrayerCard = memo(({ avatarSource, title, description, ...props }) => (
  <StyledView>
    <StyledCardContent>
      <SideBySideView>
        <H3>{title}</H3>
        <Touchable onPress={() => ''}>
          <ChannelLabel icon="profile" label="My Prayers" />
        </Touchable>
      </SideBySideView>
      <StyledBodyText>{description}</StyledBodyText>
    </StyledCardContent>
    <StyledFlexedView>
      <Button
        title={'Add a Prayer Request'}
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
