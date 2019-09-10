import React, { memo } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import {
  styled,
  Button,
  BodyText,
  H4,
  Placeholder,
} from '@apollosproject/ui-kit';

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

const StyledButton = styled({
  width: '100%',
})(Button);

const PrayerTab = memo(
  ({ prayers, type, title, description, loading, ...props }) => (
    <HorizontalPaddedView>
      <Placeholder.Paragraph
        lineNumber={2}
        onReady={!loading}
        lastLineWidth="100%"
        firstLineWidth="60%"
      >
        {prayers.length > 0 ? (
          <View>
            <VerticalPaddedView>
              <StyledH4 placeholder={'Loading Prayers'}>{description}</StyledH4>
            </VerticalPaddedView>
            <StyledButton
              title="Start praying"
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
      </Placeholder.Paragraph>
    </HorizontalPaddedView>
  )
);

PrayerTab.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  prayers: PropTypes.arrayOf(
    PropTypes.shape({}) // TODO fill this out
  ),
  loading: PropTypes.bool,
};

PrayerTab.displayName = 'PrayerTab';

export default PrayerTab;
