import { Interactions as apollosInteractions } from '@apollosproject/data-connector-rock';
import { parseGlobalId } from '@apollosproject/server-core';
import ApollosConfig from '@apollosproject/config';

export default class Interactions extends apollosInteractions.dataSource {
  async createPrayerRequestInteraction({
    prayerId,
    operationName,
    prayerTitle,
  }) {
    const {
      dataSources: { RockConstants, Auth },
    } = this.context;
    const { id } = parseGlobalId(prayerId);

    const interactionComponent = await RockConstants.prayerRequestInteractionComponent(
      {
        prayerRequestId: id,
        prayerName: id,
      }
    );
    const currentUser = await Auth.getCurrentPerson();
    const interactionId = await this.post('/Interactions', {
      PersonAliasId: currentUser.primaryAliasId,
      InteractionComponentId: interactionComponent.id,
      InteractionSessionId: this.context.sessionId,
      Operation: operationName,
      InteractionDateTime: new Date().toJSON(),
      InteractionSummary: `${operationName} - ${prayerTitle}`,
      InteractionData: `${
        ApollosConfig.APP.DEEP_LINK_HOST
      }://Interactions/PrayerRequest?prayerId=${prayerId}`,
    });
    return this.get(`/Interactions/${interactionId}`);
  }
}
