import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

import { ActionCard, TextInput, Touchable } from '@apollosproject/ui-kit';
import ShareButton from 'newspringchurchapp/src/ui/ShareButton';

const NotesFeature = ({ placeholder, contentId }) => {
  const [hasBox, showBox] = useState(false);
  const [notes, changeNotes] = useState('');
  return (
    <ActionCard
      icon={'play'}
      action={<ShareButton message={placeholder} itemId={contentId} />}
    >
      {hasBox ? (
        <TextInput
          multiline
          text={notes}
          onChangeText={(newNotes) => changeNotes({ newNotes })}
        />
      ) : (
        <Touchable onPress={() => showBox(true)}>
          <Text>[PLUS_ICON]</Text>
        </Touchable>
      )}
    </ActionCard>
  );
};

NotesFeature.propTypes = {
  placeholder: PropTypes.string,
  contentId: PropTypes.string.isRequired,
};

export const NOTES_FEATURE_FRAGMENT = `
fragment NotesFeatureFragment on NotesFeature {
  placeholder
  id
}
`;

export default NotesFeature;
