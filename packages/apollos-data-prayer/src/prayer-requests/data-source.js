import RockApolloDataSource from '@apollosproject/rock-apollo-data-source';
import ApollosConfig from '@apollosproject/config';

const { ROCK_MAPPINGS } = ApollosConfig;
export default class PrayerRequest extends RockApolloDataSource {
  resource = 'PrayerRequests';

  expanded = true;

  // QUERY ALL PrayerRequests
  getAll = () => this.request('PrayerRequests/Public').get();

  // QUERY PrayerRequests by Campus
  getAllByCampus = (campusId) =>
    this.request('PrayerRequests/Public')
      .filter(`CampusId eq ${campusId}`)
      .get();

  // QUERY PrayerRequests from Current Person
  getFromCurrentPerson = async () => {
    const {
      dataSources: { Auth },
    } = this.context;

    const { primaryAliasId } = await Auth.getCurrentPerson();

    return this.request('PrayerRequests/Public')
      .filter(`RequestedByPersonAliasId eq ${primaryAliasId}`)
      .get();
  };

  // QUERY PrayerRequests from groups
  getFromGroups = async () => {
    const {
      dataSources: { Auth },
    } = this.context;

    const groupTypeIds = ROCK_MAPPINGS.PRAYER_GROUP_TYPE_IDS.join();

    const { id } = await Auth.getCurrentPerson();

    return this.request(
      `PrayerRequests/GetForGroupMembersOfPersonInGroupTypes/${id}?groupTypeIds=${groupTypeIds}&excludePerson=true`
    ).get();
  };

  // QUERY PrayRequest by ID
  getFromId = (id) =>
    this.request()
      .find(id)
      .get();

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

  // MUTATION add public prayer request
  add = async ({
    CampusId,
    CategoryId,
    Text,
    FirstName,
    LastName,
    IsAnonymous,
  }) => {
    const {
      dataSources: { Auth },
    } = this.context;
    try {
      const { primaryAliasId } = await Auth.getCurrentPerson();

      const newPrayerRequest = await this.post('/PrayerRequests', {
        FirstName, // Required by Rock
        LastName,
        Text, // Required by Rock
        CategoryId,
        CampusId,
        IsPublic: true,
        RequestedByPersonAliasId: primaryAliasId,
        IsActive: true,
        IsApproved: true,
        EnteredDateTime: new Date().toJSON(), // Required by Rock
      });
      // Sets the attribute value "IsAnonymous" on newly created prayer request
      await this.post(
        `/PrayerRequests/AttributeValue/${newPrayerRequest}?attributeKey=IsAnonymous&attributeValue=${IsAnonymous ||
          'False'}`
      );
      return this.getFromId(newPrayerRequest);
    } catch (err) {
      throw new Error(`Unable to create prayer request!`);
    }
  };
}
