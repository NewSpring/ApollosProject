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

  getEntityType = async () =>
    this.request('EntityTypes')
      .filter(`Name eq 'Rock.Model.PrayerRequest'`)
      .first();

  getInteractionComponent = async ({ prayerId }) => {
    const { RockConstants } = this.context.dataSources;
    const { id: entityTypeId } = await this.getEntityType();
    const channel = await RockConstants.createOrFindInteractionChannel({
      channelName: ROCK_MAPPINGS.INTERACTIONS.CHANNEL_NAME,
      entityTypeId,
    });
    return RockConstants.createOrFindInteractionComponent({
      componentName: `${
        ROCK_MAPPINGS.INTERACTIONS.PRAYER_REQUEST
      } - ${prayerId}`,
      channelId: channel.id,
      entityId: parseInt(prayerId, 10),
    });
  };

  createInteraction = async ({ prayerId }) => {
    const { Auth } = this.context.dataSources;

    const interactionComponent = await this.getInteractionComponent({
      prayerId,
    });

    const currentUser = await Auth.getCurrentPerson();
    const { requestedByPersonAliasId } = await this.getFromId(prayerId);

    // determine whether to send notification
    // Rock is triggering the workflow based on the Summary field
    // if it's older than 2 hours ago
    const lastPrayerNotified = await this.request('Interactions')
      .filter(`InteractionData eq '${requestedByPersonAliasId}'`)
      .andFilter(`InteractionSummary eq 'PrayerNotificationSent'`)
      .orderBy('InteractionDateTime', 'desc')
      .first();
    const summary =
      !lastPrayerNotified ||
      moment(lastPrayerNotified.interactionDateTime).add(2, 'hours') < moment()
        ? 'PrayerNotificationSent'
        : '';

    const interactionId = await this.post('/Interactions', {
      PersonAliasId: currentUser.primaryAliasId,
      InteractionComponentId: interactionComponent.id,
      InteractionSessionId: this.context.sessionId,
      Operation: 'Pray',
      InteractionDateTime: new Date().toJSON(),
      InteractionSummary: summary,
      InteractionData: `${requestedByPersonAliasId}`,
    });

    return this.get(`/Interactions/${interactionId}`);
  };

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

  getAllByCampus = async (id = '') => {
    const {
      dataSources: { Auth, Campus },
    } = this.context;

    const { id: personID, primaryAliasId } = await Auth.getCurrentPerson();

    let campusID;
    if (id === '') {
      campusID = (await Campus.getForPerson(personID)).id;
    } else {
      campusID = parseGlobalId(id).id;
    }

    const prayers = await this.request('PrayerRequests/Public')
      .filter(
        `(CampusId eq ${campusID}) and (RequestedByPersonAliasId ne ${primaryAliasId})`
      )
      .get();
    return this.sortPrayers(prayers);
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
      // Sort user prayers by date - newest first
      return prayers.sort((a, b) =>
        moment(a.createdDateTime) < moment(b.createdDateTime) ? 1 : -1
      );
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

      // filter out flagged prayers
      return prayers.filter(
        (prayer) => !prayer.flagCount || prayer.flagCount === 0
      );
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
