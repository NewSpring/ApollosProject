import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { PaddedView } from '@apollosproject/ui-kit';

import PrayerMenuCard from '.';

storiesOf('PrayerMenuCard', module).add('Example', () => (
  <PaddedView>
    <PrayerMenuCard
      title={'A Card Title'}
      image={'https://picsum.photos/600/400/?random'}
      link={'https://github.com'}
      overlayColor={['#6BAC43', '#6BAC43']}
    />
  </PaddedView>
));
