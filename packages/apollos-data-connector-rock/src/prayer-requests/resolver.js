import { createGlobalId } from '@apollosproject/server-core';

export default {
  Query: {
    getPrayerRequests: (root, args, { dataSources }) =>
      dataSources.PrayerRequest.getPrayerRequests(),
  },
  //   Mutation: {
  //     updateProfileField: (root, { input: { field, value } }, { dataSources }) =>
  //       dataSources.Person.updateProfile([{ field, value }]),
  //     updateProfileFields: (root, { input }, { dataSources }) =>
  //       dataSources.Person.updateProfile(input),
  //     uploadProfileImage: async (root, { file, size }, { dataSources }) =>
  //       dataSources.Person.uploadProfileImage(file, size),
  //   },
  PrayerRequest: {
    id: ({ id }, args, context, { parentType }) =>
      createGlobalId(id, parentType.name),
  },
};
