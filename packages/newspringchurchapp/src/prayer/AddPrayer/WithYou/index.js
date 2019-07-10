import React, { memo } from 'react';
import { Text } from 'react-native';
import { ModalView } from '@apollosproject/ui-kit';

// addanother -> nav.pop()
// pray for others -> nav.PrayerList()
const WithYou = memo((...props) => (
  <ModalView {...props}>
    <Text> Hello </Text>
  </ModalView>
));

WithYou.displayName = 'WithYou';

export default WithYou;
