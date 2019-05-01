import { ContentItem } from '@apollosproject/data-connector-rock';

import ApollosConfig from '@apollosproject/config';

const { ROCK_MAPPINGS } = ApollosConfig;

class PrayerMenuCategory extends ContentItem.dataSource {
  getPrayerMenuCategories = async () => {
    const allCategories = this.request()
      .filter(
        `ContentChannelId eq ${ROCK_MAPPINGS.PRAYER_MENU_CATEGORIES_CHANNEL_ID}`
      )
      .get();
    // don't show campus category if they don't have one
    const {
      dataSources: { Auth },
    } = this.context;
    const currentPerson = await Auth.getCurrentPerson();
    // TODO: filter on whether they have a campus or group
    console.log('person', currentPerson);
    return allCategories;
  };
}

export default PrayerMenuCategory;
