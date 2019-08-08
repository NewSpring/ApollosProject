import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

import { ActionCard, TextInput, Touchable } from '@apollosproject/ui-kit';
import ShareButton from 'newspringchurchapp/src/ui/ShareButton';

const NoteFeature = ({ placeholder, contentId }) => {
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

NoteFeature.propTypes = {
  placeholder: PropTypes.string,
  contentId: PropTypes.string.isRequired,
};

export const NOTE_FEATURE_FRAGMENT = `
fragment NoteFeatureFragment on NoteFeature {
  placeholder
  id
}
`;

export default NoteFeature;
