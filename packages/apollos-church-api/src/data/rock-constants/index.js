import { RockConstants as apollosRockConstants } from '@apollosproject/data-connector-rock';
import ApollosConfig from '@apollosproject/config';

const { ROCK_MAPPINGS } = ApollosConfig;

const mapNewSpringNameToRockName = (name) => {
  if (ROCK_MAPPINGS.PRAYER_REQUEST_TYPE.includes(name)) {
    return 'PrayerRequest';
  }
  throw new Error(`${name} is not the correct Prayer Request Rock type!`);
};

class RockConstants extends apollosRockConstants.dataSource {
  async prayerRequestInteractionComponent({
    prayerRequestId,
    prayerName = null,
  }) {
    const channel = await this.prayerRequestInteractionChannel();
    return this.createOrFindInteractionComponent({
      componentName: `${
        ROCK_MAPPINGS.INTERACTIONS.COMPONENT_NAME_PRAYER_REQUEST
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

  async prayerModelType(nameInput) {
    const name = mapNewSpringNameToRockName(nameInput);

    const types = await this.request('EntityTypes')
      .filter(`Name eq 'Rock.Model.${name}'`)
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
