// import { get } from 'lodash';
import RockApolloDataSource from '@apollosproject/rock-apollo-data-source';
// import ApollosConfig from '@apollosproject/config';
// import moment from 'moment-timezone';
// import natural from 'natural';
// import sanitizeHtmlNode from 'sanitize-html';

// import { createImageUrlFromGuid } from '../utils';

// const { ROCK, ROCK_MAPPINGS, ROCK_CONSTANTS } = ApollosConfig;

export default class PrayerRequest extends RockApolloDataSource {
  resource = 'PrayerRequests';

  getPrayerRequests = () => this.request().get();
}
