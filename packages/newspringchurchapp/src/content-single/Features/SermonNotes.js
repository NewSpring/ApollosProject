import React from 'react';
import PropTypes from 'prop-types';
import ShareContentButtonConnected from 'newspringchurchapp/src/ui/ShareContentButtonConnected';
import { H3, H5, PaddedView, ActionCard } from '@apollosproject/ui-kit';

const SermonNotes = ({ contentId, features }) => (
  <ActionCard
    action={<ShareContentButtonConnected icon={'play'} itemId={contentId} />}
  >
    <H3>Sermon Notes</H3>
    <H5>Title</H5>
    <H5>Series - Week # - Date</H5>
    <H5>Preacher</H5>
    <PaddedView />
    {features}
  </ActionCard>
);

SermonNotes.propTypes = {
  contentId: PropTypes.string,
  features: PropTypes.arrayOf(PropTypes.element),
};
export default SermonNotes;
