import { RockConstants as apollosRockConstants } from '@apollosproject/data-connector-rock';
import ApollosConfig from '@apollosproject/config';

const { ROCK_MAPPINGS } = ApollosConfig;

class RockConstants extends apollosRockConstants.dataSource {
  async prayerRequestInteractionComponent({
    prayerRequestId,
    prayerName = null,
  }) {
    const { PrayerRequest } = this.context.dataSources;
    // const channel = await this.prayerRequestInteractionChannel();
    // return this.createOrFindInteractionComponent({
    // componentName: `${
    // ROCK_MAPPINGS.INTERACTIONS.PRAYER_REQUEST
    // } - ${prayerName || prayerRequestId}`,
    // channelId: channel.id,
    // entityId: parseInt(prayerRequestId, 10),
    // });
    return PrayerRequest.getInteractionComponent({ prayerRequestId });
  }

  async prayerRequestInteractionChannel() {
    const { PrayerRequest } = this.context.dataSources;
    // const { id } = await this.prayerModelType('PrayerRequest');
    // return this.createOrFindInteractionChannel({
    // channelName: ROCK_MAPPINGS.INTERACTIONS.CHANNEL_NAME,
    // entityTypeId: id,
    // });
    return PrayerRequest.getInteractionChannel();
  }
}

// eslint-disable-next-line import/prefer-default-export
export { RockConstants as dataSource };
