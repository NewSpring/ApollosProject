import React from 'react';
import { storiesOf } from '@storybook/react-native';

import AddPrayerForm from './AddPrayerForm';

storiesOf('prayer/AddPrayer/AddPrayerForm', module)
  .add('default', () => <AddPrayerForm navigation={{ pop: () => {} }} />)
  .add('avatarSource', () => (
    <AddPrayerForm
      navigation={{ pop: () => {} }}
      avatarSource={{ uri: 'https://picsum.photos/55/55?random' }}
    />
  ))
  .add('btnLabel', () => (
    <AddPrayerForm
      navigation={{ pop: () => {} }}
      btnLabel={'Custom button label'}
    />
  ));
