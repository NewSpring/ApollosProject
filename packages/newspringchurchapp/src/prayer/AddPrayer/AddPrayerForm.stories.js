import React from 'react';
import { storiesOf } from '@storybook/react-native';

import AddPrayerForm from '.';

storiesOf('prayer/AddPrayer/AddPrayerForm', module).add('default', () => (
  <AddPrayerForm />
));
