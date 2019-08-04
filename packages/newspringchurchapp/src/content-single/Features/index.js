import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { ErrorCard, ActionCard, PaddedView } from '@apollosproject/ui-kit';
import ShareButton from 'newspringchurchapp/src/ui/ShareButton';
import { get } from 'lodash';
import TextFeature from './TextFeature';
import CustomNotes from './CustomNotes';

import GET_CONTENT_ITEM_FEATURES from './getContentItemFeatures';

const FEATURE_MAP = {
  TextFeature,
};

const Features = ({ contentId, asNotes }) => {
  if (!contentId) return null;

  return (
    <Query query={GET_CONTENT_ITEM_FEATURES} variables={{ contentId }}>
      {({ data: { node } = {}, loading, error }) => {
        if (error) return <ErrorCard error={error} />;
        if (loading) return null;

        const features = get(node, 'features', []);
        const featureComponents = features.map(({ __typename, ...feature }) => {
          const Feature = FEATURE_MAP[__typename];
          return (
            <View key={feature.id}>
              <Feature {...feature} contentId={contentId} card={!asNotes} />
              {asNotes ? <CustomNotes /> : null}
              <PaddedView />
            </View>
          );
        });
        return asNotes ? (
          <ActionCard action={<ShareButton icon={'play'} itemId={contentId} />}>
            {featureComponents}
          </ActionCard>
        ) : (
          featureComponents
        );
      }}
    </Query>
  );
};

Features.propTypes = {
  contentId: PropTypes.string,
  asNotes: PropTypes.bool,
};

Features.defaultProps = {
  // asNotes: false,
  asNotes: true,
};

export default Features;
