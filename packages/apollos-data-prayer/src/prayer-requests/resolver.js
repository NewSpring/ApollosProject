import { createGlobalId, parseGlobalId } from '@apollosproject/server-core';
import { uniq } from 'lodash';

export default {
  Query: {
    prayers: (root, args, { dataSources }) =>
      dataSources.PrayerRequest.getAll(),
    campusPrayers: (root, { campusID }, { dataSources }) =>
      dataSources.PrayerRequest.getAllByCampus(campusID),
    userPrayers: (root, args, { dataSources }) =>
      dataSources.PrayerRequest.getFromCurrentPerson(),
    groupPrayers: (root, args, { dataSources }) =>
      dataSources.PrayerRequest.getFromGroups(),
    savedPrayers: async (root, args, { dataSources }) => {
      try {
        const followings = await dataSources.Followings.getFollowingsForCurrentUser(
          {
            type: 'PrayerRequest',
          }
        );

        const stuff = await followings.get();
        const prayerIds = stuff.map((follow) => follow.entityId);
        const prayers = await dataSources.PrayerRequest.getFromIds(
          uniq(prayerIds)
        ).get();

        return prayers;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    addPrayer: (root, args, { dataSources }) =>
      dataSources.PrayerRequest.add(args),
    deletePrayer: (root, { nodeId }, { dataSources }) => {
      const { id: parsedId } = parseGlobalId(nodeId);
      return dataSources.PrayerRequest.deletePrayer(parsedId);
    },
    incrementPrayerCount: async (root, { nodeId }, { dataSources }) => {
      const { id: parsedId } = parseGlobalId(nodeId);
      const operationName = 'Pray';

      await dataSources.Interactions.createPrayerRequestInteraction({
        prayerId: parsedId,
        operationName,
      });

      return dataSources.PrayerRequest.incrementPrayed(parsedId);
    },
    flagPrayer: (root, { nodeId }, { dataSources }) => {
      const { id: parsedId } = parseGlobalId(nodeId);
      return dataSources.PrayerRequest.flag(parsedId);
    },
    savePrayer: async (
      root,
      { nodeId },
      { dataSources, models: { Node } },
      { schema }
    ) => {
      await dataSources.Followings.followNode({
        nodeId,
      });
      return Node.get(nodeId, dataSources, schema);
    },
    unSavePrayer: async (
      root,
      { nodeId },
      { dataSources, models: { Node } },
      { schema }
    ) => {
      await dataSources.Followings.unFollowNode({
        nodeId,
      });
      return Node.get(nodeId, dataSources, schema);
    },
  },
  PrayerRequest: {
    id: ({ id }, args, context, { parentType }) =>
      createGlobalId(id, parentType.name),
    campus: ({ campusId }, args, { dataSources }) =>
      dataSources.Campus.getFromId(campusId),
    isAnonymous: ({ attributeValues: { isAnonymous: { value } = {} } = {} }) =>
      value === 'True',
    person: ({ requestedByPersonAliasId }, args, { dataSources }) =>
      dataSources.Person.getFromAliasId(requestedByPersonAliasId),
  },
};
