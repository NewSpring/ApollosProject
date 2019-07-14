import RockApolloDataSource from '@apollosproject/rock-apollo-data-source';
import ApollosConfig from '@apollosproject/config';
import moment from 'moment-timezone';
import { uniq } from 'lodash';
import { parseGlobalId } from '@apollosproject/server-core';

const { ROCK, ROCK_MAPPINGS } = ApollosConfig;
export default class PrayerRequest extends RockApolloDataSource {
  resource = 'PrayerRequests';

  expanded = true;

  sortPrayers = (prayers) =>
    prayers.sort((a, b) => {
      if (!b.prayerCount || a.prayerCount > b.prayerCount) return 1;
      if (a.prayerCount === b.prayerCount)
        return moment(a.createdDateTime) > moment(b.createdDateTime) ? 1 : -1;
      return -1;
    });

  // Sort user prayers by date - newest first
  sortUserPrayers = (prayers) =>
    prayers.sort((a, b) =>
      moment(a.createdDateTime) < moment(b.createdDateTime) ? 1 : -1
    );

  // QUERY ALL PrayerRequests
  getAll = async () => {
    try {
      const {
        dataSources: { Auth },
      } = this.context;

      const { primaryAliasId } = await Auth.getCurrentPerson();

      const prayers = await this.request('PrayerRequests/Public')
        .filter(`RequestedByPersonAliasId ne ${primaryAliasId}`)
        .get();
      return this.sortPrayers(prayers);
    } catch (err) {
      throw new Error(err);
    }
  };

  // QUERY PrayerRequests by Campus
  getAllByCampus = async (campusId) => {
    try {
      const {
        dataSources: { Auth },
      } = this.context;

      const { primaryAliasId } = await Auth.getCurrentPerson();

      const prayers = await this.request('PrayerRequests/Public')
        .filter(
          `(CampusId eq ${
            parseGlobalId(campusId).id
          }) and (RequestedByPersonAliasId ne ${primaryAliasId})`
        )
        .get();
      return this.sortPrayers(prayers);
    } catch (err) {
      throw new Error(err);
    }
  };

  // QUERY PrayerRequests from Current Person
  getFromCurrentPerson = async () => {
    try {
      const {
        dataSources: { Auth },
      } = this.context;

      const { primaryAliasId } = await Auth.getCurrentPerson();

      const prayers = await this.request('PrayerRequests/Public')
        .filter(`RequestedByPersonAliasId eq ${primaryAliasId}`)
        .get();
      return this.sortUserPrayers(prayers);
    } catch (err) {
      throw new Error(err);
    }
  };

  // QUERY PrayerRequests from groups
  getFromGroups = async () => {
    const {
      dataSources: { Auth },
    } = this.context;

    const groupTypeIds = ROCK_MAPPINGS.PRAYER_GROUP_TYPE_IDS.join();

    const { id } = await Auth.getCurrentPerson();

    const prayers = await this.request(
      `PrayerRequests/GetForGroupMembersOfPersonInGroupTypes/${id}?groupTypeIds=${groupTypeIds}&excludePerson=true`
    ).get();
    return this.sortPrayers(prayers);
  };

  // QUERY PrayRequest by ID
  getFromId = (id) =>
    this.request()
      .find(id)
      .get();

  getFromIds = (ids) =>
    this.request().filterOneOf(ids.map((id) => `Id eq ${id}`));

  getSavedPrayers = async () => {
    const {
      dataSources: { Followings },
    } = this.context;

    try {
      const followedPrayersRequest = await Followings.getFollowingsForCurrentUser(
        {
          type: 'PrayerRequest',
        }
      );

      const entities = await followedPrayersRequest.get();
      if (!entities.length) return [];

      const entityIds = entities.map((entity) => entity.entityId);
      const prayers = await this.getFromIds(uniq(entityIds)).get();

      return prayers;
    } catch (err) {
      throw new Error(err);
    }
  };

  // MUTATION increment prayed, for a request
  incrementPrayed = async (parsedId) => {
    try {
      await this.put(`PrayerRequests/Prayed/${parsedId}`, {});
      return await this.getFromId(parsedId);
    } catch (err) {
      throw new Error(`Unable to increment prayed request!`);
    }
  };

  // MUTATION flag a prayer request
  flag = async (parsedId) => {
    try {
      await this.put(`PrayerRequests/Flag/${parsedId}`, {});
      return await this.getFromId(parsedId);
    } catch (err) {
      throw new Error(`Unable to increment prayed request!`);
    }
  };

  // MUTATION Delete a prayer request
  deletePrayer = async (parsedId) => {
    try {
      this.expanded = false;
      const deletedPrayer = await this.getFromId(parsedId);
      await this.delete(`PrayerRequests/${parsedId}`);
      return deletedPrayer;
    } catch (err) {
      throw new Error(`Unable to delete prayer request`);
    }
  };

  // MUTATION add public prayer request
  add = async ({
    campusId,
    categoryId,
    text,
    firstName,
    lastName,
    isAnonymous,
  }) => {
    const {
      dataSources: { Auth },
    } = this.context;
    try {
      const { primaryAliasId } = await Auth.getCurrentPerson();

      const newPrayerRequest = await this.post('/PrayerRequests', {
        FirstName: firstName, // Required by Rock
        LastName: lastName,
        Text: text, // Required by Rock
        CategoryId: categoryId || ROCK_MAPPINGS.GENERAL_PRAYER_CATEGORY_ID,
        // default to web campus
        CampusId: campusId
          ? parseInt(parseGlobalId(campusId).id, 10)
          : ROCK_MAPPINGS.WEB_CAMPUS_ID,
        IsPublic: true,
        RequestedByPersonAliasId: primaryAliasId,
        IsActive: true,
        IsApproved: true,
        EnteredDateTime: moment()
          .tz(ROCK.TIMEZONE)
          .format(), // Required by Rock
      });
      // Sets the attribute value "IsAnonymous" on newly created prayer request
      // TODO: we should combine this so network doesn't die and someone's prayer is left un-anonymous
      await this.post(
        `/PrayerRequests/AttributeValue/${newPrayerRequest}?attributeKey=IsAnonymous&attributeValue=${
          isAnonymous ? 'True' : 'False'
        }`
      );
      return this.getFromId(newPrayerRequest);
    } catch (err) {
      throw new Error(`Unable to create prayer request!`);
    }
  };
}
