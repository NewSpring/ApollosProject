import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { PaddedView } from '@apollosproject/ui-kit';

import SaveButton from '.';

storiesOf('SaveButton', module).add('default', () =>
  (
    <PaddedView>
      <SaveButton />
    </PaddedView>
  ).add('Saved', () => (
    <PaddedView>
      <SaveButton saved />
    </PaddedView>
  ))
);
