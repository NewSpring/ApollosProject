import React from 'react';
import { storiesOf } from '@storybook/react-native';

import AddPrayer from '.';

storiesOf('prayer/AddPrayer', module).add('default', () => (
  <AddPrayer imgSrc={{ uri: 'https://picsum.photos/1200/1200?random' }} />
));
