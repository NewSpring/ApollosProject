import React from 'react';
import { storiesOf } from '@storybook/react-native';

import AddPrayerForm from './AddPrayerForm';

storiesOf('prayer/AddPrayer/AddPrayerForm', module).add('default', () => (
  <AddPrayerForm />
));
