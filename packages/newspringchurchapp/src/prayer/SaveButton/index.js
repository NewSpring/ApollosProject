import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import SaveButton from './SaveButton';

class SaveButtonConnected extends React.Component {
  state = {
    saved: false,
  };

  static propTypes = {
    prayerID: PropTypes.string,
  };

  render() {
    return <SaveButton saved={this.state.saved} />;
  }
}

export default SaveButtonConnected;
