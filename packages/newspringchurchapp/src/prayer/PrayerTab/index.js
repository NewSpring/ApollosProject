import React from 'react';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { styled, Button, BodyText, H4 } from '@apollosproject/ui-kit';

const VerticalPaddedView = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit,
}))(View);

const HorizontalPaddedView = styled(({ theme }) => ({
  paddingHorizontal: theme.sizing.baseUnit,
}))(View);

const StyledBodyText = styled(({ theme }) => ({
  color: theme.colors.white,
}))(BodyText);

const StyledH4 = styled(({ theme }) => ({
  color: theme.colors.white,
}))(H4);

const PrayerTab = withNavigation(
  ({ title, description, prayers, type, query, list, ...props }) => (
    <HorizontalPaddedView>
      {prayers.length > 0 ? (
        <View>
          <VerticalPaddedView>
            <StyledBodyText>{description}</StyledBodyText>
          </VerticalPaddedView>
          <Button
            title="Start Praying"
            onPress={() =>
              props.navigation.navigate('PrayerList', {
                list,
                prayers,
                title,
                query,
              })
            }
          />
        </View>
      ) : (
        <VerticalPaddedView>
          {type === 'saved' ? (
            <StyledH4>You do not have any saved prayers</StyledH4>
          ) : (
            <VerticalPaddedView>
              <StyledH4>There are no prayers yet for your {type}</StyledH4>
              <StyledBodyText>Be the first to add one!</StyledBodyText>
            </VerticalPaddedView>
          )}
        </VerticalPaddedView>
      )}
    </HorizontalPaddedView>
  )
);

PrayerTab.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  route: PropTypes.string,
};

export default PrayerTab;
