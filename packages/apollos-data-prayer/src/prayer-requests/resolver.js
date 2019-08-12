import { createGlobalId, parseGlobalId } from '@apollosproject/server-core';
import { isNumber } from 'lodash';

export default {
  Query: {
    prayers: (root, args, { dataSources }) =>
      dataSources.PrayerRequest.getAll(),
    campusPrayers: (root, { campusId }, { dataSources }) =>
      dataSources.PrayerRequest.getAllByCampus(campusId),
    userPrayers: (root, args, { dataSources }) =>
      dataSources.PrayerRequest.getFromCurrentPerson(),
    groupPrayers: (root, args, { dataSources }) =>
      dataSources.PrayerRequest.getFromGroups(),
    savedPrayers: async (root, args, { dataSources }) =>
      dataSources.PrayerRequest.getSavedPrayers(),
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

      // create the interaction to trigger a notification
      await dataSources.PrayerRequest.createInteraction({
        prayerId: parsedId,
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
      isNumber(campusId) ? dataSources.Campus.getFromId(campusId) : null,
    isAnonymous: ({ attributeValues: { isAnonymous: { value } = {} } = {} }) =>
      value === 'True',
    person: ({ requestedByPersonAliasId }, args, { dataSources }) =>
      dataSources.Person.getFromAliasId(requestedByPersonAliasId),
    flagCount: ({ flagCount }) =>
      (typeof flagCount === 'number' && flagCount) || 0,
    prayerCount: ({ prayerCount }) =>
      (typeof prayerCount === 'number' && prayerCount) || 0,
    isSaved: async ({ id }, args, { dataSources }) => {
      const followings = await dataSources.Followings.getFollowingsForCurrentUserAndNode(
        {
          nodeId: createGlobalId(id, 'PrayerRequest'),
        }
      );
      return followings.length > 0;
    },
  },
};
