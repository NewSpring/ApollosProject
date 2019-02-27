import React from 'react';
import { Providers } from '@apollosproject/ui-kit';
import ClientProvider from './client';

import theme from './theme'; // where theme looks like:

const NewSpringProviders = (props) => (
  <Providers themeInput={theme}>
    <ClientProvider {...props} />
  </Providers>
);

export default NewSpringProviders;
