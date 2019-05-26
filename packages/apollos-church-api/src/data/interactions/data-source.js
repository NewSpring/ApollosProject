import { Interactions as apollosInteractions } from '@apollosproject/data-connector-rock';

export default class Interactions extends apollosInteractions.dataSource {
  async createPrayerRequestInteraction({ prayerId, operationName }) {
    const {
      dataSources: { RockConstants, Auth, PrayerRequest },
    } = this.context;

    const interactionComponent = await RockConstants.prayerRequestInteractionComponent(
      {
        prayerRequestId: prayerId,
        prayerName: prayerId,
      }
    );

    const currentUser = await Auth.getCurrentPerson();
    const { requestedByPersonAliasId } = await PrayerRequest.getFromId(
      prayerId
    );

    const interactionId = await this.post('/Interactions', {
      PersonAliasId: currentUser.primaryAliasId,
      InteractionComponentId: interactionComponent.id,
      InteractionSessionId: this.context.sessionId,
      Operation: operationName,
      InteractionDateTime: new Date().toJSON(),
      InteractionSummary: `${operationName}`,
      InteractionData: `${requestedByPersonAliasId}`,
    });

    return this.get(`/Interactions/${interactionId}`);
  }
}
