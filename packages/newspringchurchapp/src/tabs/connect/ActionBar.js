import React from 'react';
import { ActionBar, ActionBarItem } from '@apollosproject/ui-kit';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { WebBrowserConsumer } from 'newspringchurchapp/src/ui/WebBrowser';

const Toolbar = () => (
  <WebBrowserConsumer>
    {(openUrl) => (
      <ActionBar>
        <ActionBarItem
          onPress={() =>
            openUrl(
              'https://newspring.cc/give/now1',
              { externalBrowser: true },
              { useRockToken: true }
            )
          }
          icon="give"
          label="Give"
        />
        <ActionBarItem
          onPress={() =>
            openUrl('https://newspring.cc/serving', {}, { useRockToken: true })
          }
          icon="pray"
          label="Serve"
        />
      </ActionBar>
    )}
  </WebBrowserConsumer>
);

Toolbar.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigation(Toolbar);
