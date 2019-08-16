import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

import { ActionCard, BodyText } from '@apollosproject/ui-kit';
import ShareContentButtonConnected from 'newspringchurchapp/src/ui/ShareContentButtonConnected';

const TextFeature = ({ body, sharing: { message } = {}, contentId, card }) => {
  const [isPressed, press] = useState(false);
  const bodyWithBlank = body.replace(/__(.*)__/gm, (match, p1) =>
    '_'.repeat(p1.length)
  );
  const bodyWithWord = body.replace(/__(.*)__/gm, (match, p1) => p1);
  const FillInTheBlank = () => (
    <BodyText>{isPressed ? bodyWithWord : bodyWithBlank}</BodyText>
  );

  return (
    <TouchableOpacity onPress={() => press(true)}>
      {card ? (
        <ActionCard
          icon={'play'}
          action={
            <ShareContentButtonConnected message={message} itemId={contentId} />
          }
        >
          <FillInTheBlank />
        </ActionCard>
      ) : (
        <FillInTheBlank />
      )}
    </TouchableOpacity>
  );
};

TextFeature.propTypes = {
  body: PropTypes.string.isRequired,
  sharing: PropTypes.shape({ message: PropTypes.string }),
  contentId: PropTypes.string.isRequired,
  card: PropTypes.bool,
};

TextFeature.defaultProps = {
  card: true,
};

export const TEXT_FEATURE_FRAGMENT = `
fragment TextFeatureFragment on TextFeature {
  body
  id
  sharing {
    message
  }
}
`;

export default TextFeature;
