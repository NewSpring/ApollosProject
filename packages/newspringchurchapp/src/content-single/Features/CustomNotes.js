import React, { useState } from 'react';
import { TextInput, Touchable } from '@apollosproject/ui-kit';
import Add from '../../theme/icons/Add';

const CustomNotes = () => {
  const [hasBox, showBox] = useState(false);
  const [notes, changeNotes] = useState('');
  return hasBox ? (
    <TextInput
      multiline
      text={notes}
      onChangeText={(text) => changeNotes({ text })}
    />
  ) : (
    <Touchable onPress={() => showBox(true)}>
      <Add size={16} />
    </Touchable>
  );
};

export default CustomNotes;
