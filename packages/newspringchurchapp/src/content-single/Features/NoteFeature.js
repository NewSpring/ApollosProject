import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { ActionCard, TextInput, Touchable } from '@apollosproject/ui-kit';
import ShareContentButtonConnected from 'newspringchurchapp/src/ui/ShareContentButtonConnected';
import Add from '../../theme/icons/Add';

const Note = ({ id: featureId, placeholder, onNotesChange, onNoteChange }) => {
  const [hasBox, showBox] = useState(false);
  const [note, setNote] = useState('');
  return hasBox ? (
    <TextInput
      multiline
      defaultValue={placeholder}
      value={note}
      onChangeText={(text) => {
        setNote(text); // this is local state
        onNoteChange(text); // updates text for sharing this specific note
        onNotesChange(featureId, text); // updates text for sharing sermon notes
      }}
    />
  ) : (
    <Touchable onPress={() => showBox(true)}>
      <Add size={16} />
    </Touchable>
  );
};
Note.propTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string,
  onNotesChange: PropTypes.func,
  onNoteChange: PropTypes.func,
};

const NoteFeature = ({ contentId, card, ...noteProps }) => {
  const [sharedMsg, setSharedMsg] = useState('');
  return card ? (
    <ActionCard
      icon={'play'}
      action={
        <ShareContentButtonConnected message={sharedMsg} itemId={contentId} />
      }
    >
      <Note {...noteProps} onNoteChange={(text) => setSharedMsg(text)} />
    </ActionCard>
  ) : (
    <Note {...noteProps} onNoteChange={(text) => setSharedMsg(text)} />
  );
};

NoteFeature.propTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string,
  contentId: PropTypes.string.isRequired,
  card: PropTypes.bool,
  onSharingChange: PropTypes.func,
};

NoteFeature.defaultProps = {
  card: true,
};

export const NOTE_FEATURE_FRAGMENT = `
fragment NoteFeatureFragment on NoteFeature {
  placeholder
  id
}
`;

export default NoteFeature;
