import React from 'react';
import { ActionBar, ActionBarItem } from '@apollosproject/ui-kit';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { WebBrowserConsumer } from 'newspringchurchapp/src/ui/WebBrowser';

const Toolbar = ({ navigation }) => (
  <WebBrowserConsumer>
    {(openUrl) =>
      process.env.NODE_ENV !== 'development' ? (
        <ActionBar>
          <ActionBarItem
            onPress={() => navigation.navigate('Passes')}
            icon="check"
            label="Check-in"
          />
          <ActionBarItem
            onPress={() =>
              openUrl('https://my.newspring.cc', { externalBrowser: true })
            }
            icon="download"
            label="Give"
          />
          <ActionBarItem
            onPress={() => navigation.navigate('TestingControlPanel')}
            icon="information"
            label="Test"
          />
        </ActionBar>
      ) : null
    }
  </WebBrowserConsumer>
);

Toolbar.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigation(Toolbar);
