import React from 'react';
import PropTypes from 'prop-types';

import { Icon, withTheme } from '@apollosproject/ui-kit';
import { ProtectedTouchable } from '@apollosproject/ui-auth';

const SaveIcon = withTheme(
  ({ theme: { colors: { secondary } = {} } = {}, isLiked } = {}) => ({
    name: isLiked ? 'Like-solid' : 'Like',
    fill: secondary,
  })
)(Icon);

SaveIcon.propTypes = {
  isLiked: PropTypes.bool,
};

const Save = ({ isLiked, toggleLike, itemId }) => (
  <ProtectedTouchable
    onPress={() =>
      toggleLike({ itemId, operation: isLiked ? 'UnLike' : 'Like' })
    }
  >
    <SaveIcon isSaved={isLiked} />
  </ProtectedTouchable>
);

Save.propTypes = {
  itemId: PropTypes.string,
  isLiked: PropTypes.bool,
  toggleLike: PropTypes.func,
};

export { Save as default, SaveIcon };
