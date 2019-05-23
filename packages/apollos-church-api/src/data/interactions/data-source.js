import { Interactions as apollosInteractions } from '@apollosproject/data-connector-rock';
import ApollosConfig from '@apollosproject/config';

export default class Interactions extends apollosInteractions.dataSource {
  async createPrayerRequestInteraction({ prayerId, operationName }) {
    const {
      dataSources: { RockConstants, Auth },
    } = this.context;

    const interactionComponent = await RockConstants.prayerRequestInteractionComponent(
      {
        prayerRequestId: prayerId,
        prayerName: prayerId,
      }
    );

    const currentUser = await Auth.getCurrentPerson();

    const interactionId = await this.post('/Interactions', {
      PersonAliasId: currentUser.primaryAliasId,
      InteractionComponentId: interactionComponent.id,
      InteractionSessionId: this.context.sessionId,
      Operation: operationName,
      InteractionDateTime: new Date().toJSON(),
      InteractionSummary: `${operationName}`,
      InteractionData: `${
        ApollosConfig.APP.DEEP_LINK_HOST
      }://Interactions/PrayerRequest?itemId=${prayerId}`,
    });

    return this.get(`/Interactions/${interactionId}`);
  }
}
