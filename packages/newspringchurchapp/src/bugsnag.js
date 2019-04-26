import { Client } from 'bugsnag-react-native';
import Config from 'react-native-config';
import { onError } from 'apollo-link-error';

const bugsnag = new Client(Config.BUGSNAG_API_KEY);

const bugsnagLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map((error) => bugsnag.notify(error));
  }
  if (networkError) bugsnag.notify(networkError);
});

export { bugsnag as default, bugsnagLink };
