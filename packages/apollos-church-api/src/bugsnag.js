import bugsnag from '@bugsnag/js';
import bugsnagExpress from '@bugsnag/plugin-express';

const bugsnagClient = bugsnag({
  apiKey: process.env.BUGSNAG_API_KEY,
  notifyReleaseStages: ['production', 'staging'], // don't send errors in dev or test.
});

bugsnagClient.use(bugsnagExpress);

const bugsnagMiddleware = bugsnagClient.getPlugin('express');

export { bugsnagClient as default, bugsnagMiddleware };
