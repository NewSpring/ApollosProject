import React from 'react';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';
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

const PrayerTab = withNavigation(
  ({ title, description, prayers, type, query, list, ...props }) => (
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
          <StyledH4>There are no prayers yet for your {type}</StyledH4>
          <StyledBodyText>Be the first to add one!</StyledBodyText>
        </VerticalPaddedView>
      )}
    </PaddedView>
  )
);

PrayerTab.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  route: PropTypes.string,
};

export default PrayerTab;
