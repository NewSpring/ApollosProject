import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

import { ActionCard, H5 } from '@apollosproject/ui-kit';
import ShareButton from 'newspringchurchapp/src/ui/ShareButton';

const HeaderFeature = ({ body, contentId }) => {
  const [isPressed, press] = useState(false);
  const bodyWithBlank = body.replace(/__(.*)__/gm, (match, p1) =>
    '_'.repeat(p1.length)
  );
  const bodyWithWord = body.replace(/__(.*)__/gm, (match, p1) => p1);

  return (
    <TouchableOpacity onPress={() => press(true)}>
      <ActionCard
        icon={'play'}
        action={<ShareButton message={body} itemId={contentId} />}
      >
        <H5>{isPressed ? bodyWithWord : bodyWithBlank}</H5>
      </ActionCard>
    </TouchableOpacity>
  );
};

HeaderFeature.propTypes = {
  body: PropTypes.string.isRequired,
  contentId: PropTypes.string.isRequired,
};

export const HEADER_FEATURE_FRAGMENT = `
fragment HeaderFeatureFragment on HeaderFeature {
  body
  id
}
`;

export default HeaderFeature;
