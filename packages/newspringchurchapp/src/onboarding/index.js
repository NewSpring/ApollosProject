import React, { PureComponent } from 'react';
import Onboarding from 'newspringchurchapp/src/ui/Onboarding';

export default class TestingControlPanel extends PureComponent {
  static navigationOptions = () => ({
    title: 'Onboarding',
    header: null,
    gesturesEnabled: false,
  });

  render() {
    return <Onboarding {...this.props} />;
  }
}
