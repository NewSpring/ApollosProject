import React, { memo } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import {
  PaddedView,
  styled,
  Button,
  BodyText,
  H4,
} from '@apollosproject/ui-kit';

const VerticalPaddedView = styled(({ theme }) => ({
  paddingBottom: theme.sizing.baseUnit,
}))(View);

const StyledBodyText = styled(({ theme }) => ({
  color: theme.colors.white,
}))(BodyText);

const StyledH4 = styled(({ theme }) => ({
  color: theme.colors.white,
}))(H4);

const PrayerTab = memo(({ prayers, type, title, description, ...props }) => (
  <PaddedView>
    {prayers.length > 0 ? (
      <View>
        <VerticalPaddedView>
          <StyledBodyText>{description}</StyledBodyText>
        </VerticalPaddedView>
        <Button
          title="Start Praying"
          onPress={() =>
            props.navigation.navigate('PrayerList', {
              prayers,
              title,
            })
          }
        />
      </View>
    ) : (
      <VerticalPaddedView>
        {type === 'saved' ? (
          <StyledH4>You do not have any saved prayers</StyledH4>
        ) : (
          <>
            <StyledH4>There are no prayers yet for your {type}</StyledH4>
            <StyledBodyText>Be the first to add one!</StyledBodyText>
          </>
        )}
      </VerticalPaddedView>
    )}
  </PaddedView>
));

PrayerTab.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  prayers: PropTypes.arrayOf(
    PropTypes.shape({}) // TODO fill this out
  ),

  route: PropTypes.string,
};

PrayerTab.displayName = 'PrayerTab';

export default PrayerTab;
