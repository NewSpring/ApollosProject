import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ShareContentButtonConnected from 'newspringchurchapp/src/ui/ShareContentButtonConnected';
import { H3, PaddedView, ActionCard } from '@apollosproject/ui-kit';

const SermonNotes = ({ contentId, features }) => {
  const [sharedMsg, changeSharedMsg] = useState('');
  const [enhancedFeatures, setEnhancedFeatures] = useState([]);
  useEffect(() => {
    let msg = '';
    const featuresWithCallbacks = features.map((feature) => {
      const featureProps = feature.props.children[0].props;
      if (featureProps.sharing) {
        msg = `${msg + featureProps.sharing.message}\n\n`;
      }
      const featureWithCallback = feature;
      featureWithCallback.props.onSharingChange = (text) =>
        changeSharedMsg(`${sharedMsg + text}\n\n`);
      return featureWithCallback;
    });
    changeSharedMsg(msg);
    setEnhancedFeatures(featuresWithCallbacks);
  }, []);
  return (
    <ActionCard
      action={
        <ShareContentButtonConnected
          message={sharedMsg}
          icon={'play'}
          itemId={contentId}
        />
      }
    >
      <H3>Sermon Notes</H3>
      {/* TODO
    <H5>Title</H5>
    <H5>Series - Week # - Date</H5>
    <H5>Preacher</H5>
    */}
      <PaddedView />
      {enhancedFeatures}
    </ActionCard>
  );
};

SermonNotes.propTypes = {
  contentId: PropTypes.string,
  features: PropTypes.arrayOf(PropTypes.element),
};
export default SermonNotes;
