import React from 'react';
import { storiesOf } from '@storybook/react-native';

import AddPrayerForm from '.';

storiesOf('prayer/AddPrayer/AddPrayerForm', module)
  .add('default', () => <AddPrayerForm navigation={{ pop: () => {} }} />)
  .add('imgSrc', () => (
    <AddPrayerForm
      navigation={{ pop: () => {} }}
      imgSrc={{ uri: 'https://picsum.photos/55/55?random' }}
    />
  ))
  .add('btnLabel', () => (
    <AddPrayerForm
      navigation={{ pop: () => {} }}
      btnLabel={'Custom button label'}
    />
  ));
