import React from 'react';
import PropTypes from 'prop-types';
import { ActionCard } from '@apollosproject/ui-kit';
import ShareContentButtonConnected from 'newspringchurchapp/src/ui/ShareContentButtonConnected';

const CustomActionCard = ({
  children,
  sharing: { message },
  contentId,
  card,
}) =>
  card ? (
    <ActionCard
      icon={'play'}
      action={
        <ShareContentButtonConnected message={message} itemId={contentId} />
      }
    >
      {children}
    </ActionCard>
  ) : (
    children
  );
CustomActionCard.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  sharing: PropTypes.shape({ message: PropTypes.string }),
  contentId: PropTypes.string.isRequired,
  card: PropTypes.bool,
};

CustomActionCard.defaultProps = {
  card: true,
};

export default CustomActionCard;
