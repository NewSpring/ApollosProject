import React from 'react';
import { ActionBar, ActionBarItem } from '@apollosproject/ui-kit';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { UserWebBrowserConsumer } from 'newspringchurchapp/src/user-web-browser';
import { WebBrowserConsumer } from 'newspringchurchapp/src/ui/WebBrowser';

const Toolbar = () => (
  <ActionBar>
    <WebBrowserConsumer>
      {(openUrl) => (
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
      )}
    </WebBrowserConsumer>
    <UserWebBrowserConsumer>
      {(openUserWebView) => (
        <ActionBarItem
          onPress={() =>
            openUserWebView({
              url: 'https://newspring.cc/serving',
            })
          }
          icon="pray"
          label="Serve"
        />
      )}
    </UserWebBrowserConsumer>
  </ActionBar>
);

Toolbar.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigation(Toolbar);
