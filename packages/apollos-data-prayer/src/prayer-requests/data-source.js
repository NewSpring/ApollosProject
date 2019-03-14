import RockApolloDataSource from '@apollosproject/rock-apollo-data-source';
import ApollosConfig from '@apollosproject/config';

const { ROCK_MAPPINGS } = ApollosConfig;
export default class PrayerRequest extends RockApolloDataSource {
  resource = 'PrayerRequests';

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

    const { id } = await Auth.getCurrentPerson();
    const groupTypeIds = ROCK_MAPPINGS.PRAYER_GROUP_TYPE_IDS.join();
    return this.request(
      `PrayerRequests/GetByGroups/${id}?groupTypeIds=${groupTypeIds}`
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
    IsPublic,
    CampusId,
    CategoryId,
    Text,
    FirstName,
    LastName,
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
        IsPublic,
        RequestedByPersonAliasId: primaryAliasId,
        IsActive: true,
        IsApproved: true,
        EnteredDateTime: new Date().toJSON(), // Required by Rock
      });
      return this.getFromId(newPrayerRequest);
    } catch (err) {
      throw new Error(`Unable to create prayer request!`);
    }
  };
}
