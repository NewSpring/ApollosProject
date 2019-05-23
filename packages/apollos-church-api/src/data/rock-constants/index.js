import { RockConstants as apollosRockConstants } from '@apollosproject/data-connector-rock';
import ApollosConfig from '@apollosproject/config';

const { ROCK_MAPPINGS } = ApollosConfig;

class RockConstants extends apollosRockConstants.dataSource {
  async prayerRequestInteractionComponent({
    prayerRequestId,
    prayerName = null,
  }) {
    const channel = await this.prayerRequestInteractionChannel();
    return this.createOrFindInteractionComponent({
      componentName: `${
        ROCK_MAPPINGS.INTERACTIONS.PRAYER_REQUEST
      } - ${prayerName || prayerRequestId}`,
      channelId: channel.id,
      entityId: parseInt(prayerRequestId, 10),
    });
  }

  async prayerRequestInteractionChannel() {
    const { id } = await this.prayerModelType('PrayerRequest');
    return this.createOrFindInteractionChannel({
      channelName: ROCK_MAPPINGS.INTERACTIONS.CHANNEL_NAME,
      entityTypeId: id,
    });
  }

  async prayerModelType() {
    const types = await this.request('EntityTypes')
      .filter(`Name eq 'Rock.Model.PrayerRequest'`)
      .cache({ ttl: 86400 })
      .get();
    if (types.length) {
      return types[0];
    }

    return null;
  }
}

// eslint-disable-next-line import/prefer-default-export
export { RockConstants as dataSource };
