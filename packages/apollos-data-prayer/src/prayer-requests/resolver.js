import { createGlobalId, parseGlobalId } from '@apollosproject/server-core';
import { uniq } from 'lodash';

export default {
  Query: {
    getPublicPrayerRequests: (root, args, { dataSources }) =>
      dataSources.PrayerRequest.getAll(),
    getPublicPrayerRequestsByCampus: (root, { campusId }, { dataSources }) =>
      dataSources.PrayerRequest.getAllByCampus(campusId),
    getCurrentPersonPrayerRequests: (root, args, { dataSources }) =>
      dataSources.PrayerRequest.getFromCurrentPerson(),
    getPrayerRequestsByGroups: (root, args, { dataSources }) =>
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
    getPrayerRequestById: (root, { prayerId }, { dataSources }) =>
      dataSources.PrayerRequest.getFromId(prayerId),
  },
  Mutation: {
    addPublicPrayerRequest: (root, args, { dataSources }) =>
      dataSources.PrayerRequest.add(args),
    deletePublicPrayerRequest: (root, { id }, { dataSources }) => {
      const { id: parsedId } = parseGlobalId(id);
      return dataSources.PrayerRequest.deletePrayer(parsedId);
    },
    incrementPrayed: async (root, { id }, { dataSources }) => {
      const { id: parsedId } = parseGlobalId(id);
      const operationName = 'Pray';

      await dataSources.Interactions.createPrayerRequestInteraction({
        prayerId: parsedId,
        operationName,
      });

      return dataSources.PrayerRequest.incrementPrayed(parsedId);
    },
    flagRequest: (root, { id }, { dataSources }) => {
      const { id: parsedId } = parseGlobalId(id);
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
      (typeof campusId === 'number' &&
        dataSources.Campus.getFromId(campusId)) ||
      null,
    categoryId: ({ categoryId }) =>
      (typeof categoryId === 'number' && categoryId) || 0,
    flagCount: ({ flagCount }) =>
      (typeof flagCount === 'number' && flagCount) || 0,
    prayerCount: ({ prayerCount }) =>
      (typeof prayerCount === 'number' && prayerCount) || 0,
    requestedByPersonAliasId: ({ requestedByPersonAliasId }) =>
      (typeof requestedByPersonAliasId === 'number' &&
        requestedByPersonAliasId) ||
      0,
    isAnonymous: ({ attributeValues: { isAnonymous: { value } = {} } = {} }) =>
      value === 'True',
    person: ({ requestedByPersonAliasId }, args, { dataSources }) =>
      dataSources.Person.getFromAliasId(requestedByPersonAliasId),
  },
};
