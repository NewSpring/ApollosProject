import React, { PureComponent } from 'react';
import PrayerMenu from 'newspringchurchapp/src/ui/PrayerMenu';

export default class Prayer extends PureComponent {
  static navigationOptions = () => ({
    title: 'Prayer',
    header: null,
  });

  render() {
    return <PrayerMenu />;
  }
}
