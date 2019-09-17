import { Campus as apollosCampus } from '@apollosproject/data-connector-rock';

export default class Campus extends apollosCampus.dataSource {
  getPublicByLocation = async (location) => {
    const allCampuses = await this.getByLocation(location);

    // check public attribute first
    const campuses = allCampuses.filter((campus) => {
      try {
        return campus.attributeValues.public.value === 'True';
      } catch (err) {
        console.error(
          `${err}\n\nCampus doesn't have attributeValues field to check for public status.`
        );
        // fall back is filter out if there's no location or image
        return !!(
          campus.location.longitude &&
          campus.location.latitude &&
          campus.location.image
        );
      }
    });
    return campuses;
  };
}
