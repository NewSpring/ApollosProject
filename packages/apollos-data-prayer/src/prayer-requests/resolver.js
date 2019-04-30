import { createGlobalId, parseGlobalId } from '@apollosproject/server-core';

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
    savedPrayers: async (root, { after, first }, { dataSources }) => {
      const followingsPaginated = await dataSources.Followings.paginatedGetFollowingsForCurrentUser(
        { type: 'PrayerRequest', after, first }
      );

      const followings = await followingsPaginated.edges;
      const ids = followings.map((f) => f.node.entityId);
      const prayerRequests = await dataSources.PrayerRequest.getFromIds(
        ids
      ).get();
      const prayerRequestEdges = prayerRequests.map((prayerRequest) => ({
        node: { ...prayerRequest, isLiked: true },
        following: followings.find((f) => f.node.entityId === prayerRequest.id)
          .node,
        cursor: followings.find((f) => f.node.entityId === prayerRequest.id)
          .cursor,
      }));
      const sortedPrayerRequestEdges = prayerRequestEdges.sort(
        (a, b) =>
          new Date(a.following.createdDateTime) <
          new Date(b.following.createdDateTime)
      );

      return { edges: sortedPrayerRequestEdges };
    },
  },
  Mutation: {
    addPublicPrayerRequest: (root, args, { dataSources }) =>
      dataSources.PrayerRequest.add(args),
    deletePublicPrayerRequest: (root, { id }, { dataSources }) => {
      const { id: parsedId } = parseGlobalId(id);
      return dataSources.PrayerRequest.deletePrayer(parsedId);
    },
    incrementPrayed: (root, { id }, { dataSources }) => {
      const { id: parsedId } = parseGlobalId(id);
      return dataSources.PrayerRequest.incrementPrayed(parsedId);
    },
    flagRequest: (root, { id }, { dataSources }) => {
      const { id: parsedId } = parseGlobalId(id);
      return dataSources.PrayerRequest.flag(parsedId);
    },
    savePrayer: async (
      root,
      { input: { nodeId, operation } },
      { dataSources },
      { schema }
    ) =>
      dataSources.Followings.updateLikeContentItem({
        nodeId,
        operation,
        schema,
      }),
  },
  PrayerRequest: {
    id: ({ id }, args, context, { parentType }) =>
      createGlobalId(id, parentType.name),
    campusId: ({ campusId }) => (typeof campusId === 'number' && campusId) || 0,
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
