import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { ActionCard, TextInput, Touchable } from '@apollosproject/ui-kit';
import ShareContentButtonConnected from 'newspringchurchapp/src/ui/ShareContentButtonConnected';
import Add from '../../theme/icons/Add';

const NoteFeature = ({ placeholder, contentId }) => {
  const [hasBox, showBox] = useState(false);
  const [notes, changeNotes] = useState('');
  return (
    <ActionCard
      icon={'play'}
      action={
        <ShareContentButtonConnected message={placeholder} itemId={contentId} />
      }
    >
      {hasBox ? (
        <TextInput
          multiline
          text={notes}
          onChangeText={(newNotes) => changeNotes({ newNotes })}
        />
      ) : (
        <Touchable onPress={() => showBox(true)}>
          <Add size={16} />
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
