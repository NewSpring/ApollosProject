import { ContentItem } from '@apollosproject/data-connector-rock';

import ApollosConfig from '@apollosproject/config';

const { ROCK_MAPPINGS } = ApollosConfig;

class PrayerMenuCategory extends ContentItem.dataSource {
  getPrayerMenuCategories() {
    return this.request()
      .filter(
        `ContentChannelId eq ${ROCK_MAPPINGS.PRAYER_MENU_CATEGORIES_CHANNEL_ID}`
      )
      .get();
  }
}

export default PrayerMenuCategory;
