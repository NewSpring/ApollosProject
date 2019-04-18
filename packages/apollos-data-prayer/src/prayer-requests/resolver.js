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
