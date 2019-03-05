import RockApolloDataSource from '@apollosproject/rock-apollo-data-source';

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
      .filter(`CreatedByPersonAliasId eq ${primaryAliasId}`)
      .get();
  };

  // QUERY PrayRequest by ID
  getFromId = (id) =>
    this.request()
      .find(id)
      .get();
}
