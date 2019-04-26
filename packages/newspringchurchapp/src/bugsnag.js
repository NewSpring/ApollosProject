import { Client } from 'bugsnag-react-native';
import Config from 'react-native-config';
import { onError } from 'apollo-link-error';

const bugsnag = new Client(Config.BUGSNAG_API_KEY);

const bugsnagLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      bugsnag.notify(new Error(message), (report) => {
        if (operation.variables && operation.variables.password) {
          // eslint-disable-next-line
          delete operation.variables.password;
        }
        // eslint-disable-next-line
        report.context = path.join('/');
        // eslint-disable-next-line
        report.metadata = {
          path,
          locations,
          operation,
        };
      })
    );
  }
  if (networkError) bugsnag.notify(networkError);
});

export { bugsnag as default, bugsnagLink };
