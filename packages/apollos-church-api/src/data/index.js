import { gql } from 'apollo-server';

import { createApolloServerConfig } from '@apollosproject/server-core';

import * as Analytics from '@apollosproject/data-connector-analytics';
import * as Scripture from '@apollosproject/data-connector-bible';
import * as LiveStream from '@apollosproject/data-connector-church-online';
import * as OneSignal from '@apollosproject/data-connector-onesignal';
import * as Pass from '@apollosproject/data-connector-passes';
// import * as Search from '@apollosproject/data-connector-algolia-search';
import * as Sms from '@apollosproject/data-connector-twilio';
import { PrayerRequest, PrayerMenuCategory } from 'apollos-data-prayer';
import {
  Followings,
  Person,
  ContentChannel,
  Sharable,
  Auth,
  PersonalDevice,
  Template,
  AuthSms,
  BinaryFiles,
  RockConstants,
  Group,
  Features as BaseFeatures,
} from '@apollosproject/data-connector-rock';
import * as Theme from './theme';
import * as ExtendedPerson from './people';
import * as ContentItem from './content-items';
import * as Features from './features';
import * as Campus from './campuses';

// This module is used to attach Rock User updating to the OneSignal module.
// This module includes a Resolver that overides a resolver defined in `OneSignal`
import * as OneSignalWithRock from './oneSignalWithRock';

const data = {
  Followings,
  ContentChannel,
  ContentItem,
  BaseFeatures,
  Features,
  Person,
  ExtendedPerson,
  Auth,
  AuthSms,
  Sms,
  PrayerRequest,
  PrayerMenuCategory,
  LiveStream,
  Theme,
  Scripture,
  RockConstants,
  Sharable,
  Analytics,
  OneSignal,
  PersonalDevice,
  OneSignalWithRock,
  Pass,
  Template,
  Campus,
  BinaryFiles,
  Group,
  // Search,
};

const {
  dataSources,
  resolvers,
  schema,
  context,
  applyServerMiddleware,
  setupJobs,
} = createApolloServerConfig(data);

export {
  dataSources,
  resolvers,
  schema,
  context,
  applyServerMiddleware,
  setupJobs,
};

// the upload Scalar is added
export const testSchema = [
  gql`
    scalar Upload
  `,
  ...schema,
];
