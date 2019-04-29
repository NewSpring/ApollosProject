import React from 'react';
import PropTypes from 'prop-types';

import { Icon, withTheme } from '@apollosproject/ui-kit';
import { ProtectedTouchable } from '@apollosproject/ui-auth';

import { withNavigation } from 'react-navigation';

const SaveIcon = withTheme(
  ({ theme: { colors: { secondary } = {} } = {}, isSaved } = {}) => ({
    name: isSaved ? 'Like-solid' : 'Like',
    fill: secondary,
  })
)(Icon);

SaveIcon.propTypes = {
  isSaved: PropTypes.bool,
};

const Save = withNavigation(({ isSaved, toggleSave, itemId }) => (
  <ProtectedTouchable
    onPress={() =>
      toggleSave({ itemId, operation: isSaved ? 'UnSave' : 'Save' })
    }
  >
    <SaveIcon isSaved={isSaved} />
  </ProtectedTouchable>
));

Save.propTypes = {
  itemId: PropTypes.string,
  isSaved: PropTypes.bool,
  toggleSave: PropTypes.func,
};

export { Save as default, SaveIcon };
