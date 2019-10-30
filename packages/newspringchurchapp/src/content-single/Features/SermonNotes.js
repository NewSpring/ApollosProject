import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  H3,
  PaddedView,
  ActionCard,
  Touchable,
  Icon,
  H5,
  FlexedView,
  styled,
  BodyText,
} from '@apollosproject/ui-kit';
import share from '../../utils/content/share';

const ExportWrapper = styled({
  flexDirection: 'row',
})(FlexedView);

const PaddedText = styled(({ theme }) => ({
  paddingHorizontal: theme.sizing.baseUnit,
}))(BodyText);

const SermonNotes = ({
  contentId,
  features,
  communicators,
  guestCommunicators,
}) => {
  const [sharedMsg, changeSharedMsg] = useState('');
  const [enhancedFeatures, enhanceFeatures] = useState([]);
  const onNotesChange = (id, text) => {
    const placeholder = `${id}{{(.*?)}}`;
    const re = new RegExp(placeholder, 'gs');
    changeSharedMsg((msg) => msg.replace(re, `${id}{{${text}}}`));
  };
  useEffect(() => {
    let msg = '';
    const featuresWithCallbacks = features.map((feature) => {
      const featureProps = feature.props.children[0].props;

      // assemble starting message without custom notes
      if (featureProps.sharing) {
        msg = `${msg + featureProps.sharing.message}\n\n`;
        return feature;
      }

      // drop in placeholders for custom notes
      if (featureProps.id.match(/NoteFeature/g).length > 0)
        msg = `${msg + featureProps.id}{{}}\n\n`;

      // add callbacks to swap note placeholders with custom text
      return {
        ...feature,
        props: {
          ...feature.props,
          children: [
            {
              ...feature.props.children[0],
              props: { ...feature.props.children[0].props, onNotesChange },
            },
            feature.props.children[1],
          ],
        },
      };
    });
    if (msg !== '') changeSharedMsg(msg);
    enhanceFeatures(featuresWithCallbacks);
  }, []);

  return (
    <ActionCard
      action={
        // TODO: use this when it can accept on a custom onPress function
        // so we can share content item info if we want to
        // https://github.com/ApollosProject/apollos-prototype/issues/1014
        // <ShareContentButtonConnected
        // message={sharedMsg}
        // icon={'play'}
        // itemId={contentId}
        // />
        <Touchable
          onPress={() => {
            console.log(contentId); // left in the prop for the to do item above
            const message = sharedMsg.replace(
              /\w+Feature:\w+{{(.*?)}}\n\n/gs,
              (match, p1) => (p1 === '' ? p1 : `${p1}\n\n`)
            );
            share({ message });
          }}
        >
          <ExportWrapper>
            <PaddedText>Export</PaddedText>
            <Icon name={'export'} size={24} />
          </ExportWrapper>
        </Touchable>
      }
    >
      <H3>Sermon Notes</H3>
      {/* TODO
 <H5>Title</H5>
   <H5>Series - Week # - Date</H5>
        */}
      {communicators && communicators[0] != null
        ? communicators.map((communicator) => (
            <H5 key={communicator}>
              {communicator.nickName || communicator.firstName}{' '}
              {communicator.lastName}
            </H5>
          ))
        : null}
      {guestCommunicators && guestCommunicators[0] != null
        ? guestCommunicators.map((guestCommunicator) =>
            guestCommunicator !== '' ? (
              <H5 key={guestCommunicator}>{guestCommunicator}</H5>
            ) : null
          )
        : null}

      <PaddedView />
      {enhancedFeatures}
    </ActionCard>
  );
};

SermonNotes.propTypes = {
  contentId: PropTypes.string,
  features: PropTypes.arrayOf(PropTypes.element),
  communicators: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    })
  ),
  guestCommunicators: PropTypes.arrayOf(PropTypes.string),
};
export default SermonNotes;
