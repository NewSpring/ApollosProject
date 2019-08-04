import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

import { ActionCard, BodyText } from '@apollosproject/ui-kit';
import ShareButton from 'newspringchurchapp/src/ui/ShareButton';

const TextFeature = ({ body, contentId, card }) => {
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
          action={<ShareButton message={body} itemId={contentId} />}
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
}
`;

export default TextFeature;
