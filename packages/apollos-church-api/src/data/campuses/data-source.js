import { Campus as apollosCampus } from '@apollosproject/data-connector-rock';

export default class PublicCampus extends apollosCampus.dataSource {
  getPublicByLocation = async (location) => {
    const allCampuses = await this.getByLocation(location);
    const publicCampuses = allCampuses.filter(
      (campus) => campus.attributeValues.public.value === 'True'
    );
    return publicCampuses;
  };
}
