import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { PaddedView } from '@apollosproject/ui-kit';

import PrayerPreviewCard from '.';

storiesOf('prayer/PrayerPreviewCard', module).add('Example', () => (
  <PaddedView>
    <PrayerPreviewCard
      avatarSource={{
        uri: 'https://fillmurray.com/400/600',
      }}
      name={'Bill'}
      overlayColor={['#FFF', '#FFF']}
      prayer={
        'I want to go back to school for my PTA degree next year, but I’m afraid of not getting accepted. I have a great job right now but I’m not very happy. Pray my plans for school align with God’s plans for me.'
      }
      campus={'Anderson'}
    />
  </PaddedView>
));
