import React, { PureComponent } from 'react';
import PrayerMenu from './PrayerMenu';

export default class Prayer extends PureComponent {
  static navigationOptions = () => ({
    title: 'Prayer',
    header: null,
  });

  render() {
    return <PrayerMenu />;
  }
}
