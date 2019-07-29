import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

import {
  ActionCard,
  BodyText,
  TextInput,
  styled,
} from '@apollosproject/ui-kit';
import ShareButton from 'newspringchurchapp/src/ui/ShareButton';

const StyledTextInput = styled(({ theme }) => ({
  height: theme.sizing.baseUnit * 6,
  borderWidth: 0.5,
  borderColor: theme.colors.shadows.default,
  paddingHorizontal: theme.sizing.baseUnit * 0.5,
  textAlignVertical: 'top',
}))(TextInput);

const TextFeature = ({ body, contentId }) => {
  const [isPressed, press] = useState(false);
  const [notesText, setNotesText] = useState('');
  const bodyWithBlank = body.replace(/__(.*)__/gm, (match, p1) =>
    '_'.repeat(p1.length)
  );
  const bodyWithWord = body.replace(/__(.*)__/gm, (match, p1) => p1);
  console.log(notesText);

  return (
    <TouchableOpacity onPress={() => press(true)}>
      <ActionCard
        icon={'play'}
        action={
          <ShareButton
            title={`${bodyWithWord} || My Notes: ${notesText.text}`}
            itemId={contentId}
          />
        }
      >
        <BodyText>{isPressed ? bodyWithWord : bodyWithBlank}</BodyText>
        <StyledTextInput
          multiline
          onChangeText={(text) => setNotesText({ text })}
        />
      </ActionCard>
    </TouchableOpacity>
  );
};

TextFeature.propTypes = {
  body: PropTypes.string.isRequired,
  contentId: PropTypes.string.isRequired,
};

export const TEXT_FEATURE_FRAGMENT = `
fragment TextFeatureFragment on TextFeature {
  body
  id
}
`;

export default TextFeature;
