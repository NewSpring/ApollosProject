import { Person as originalPerson } from '@apollosproject/data-connector-rock';
import { resolverMerge } from '@apollosproject/server-core';

const resolver = {
  Person: {
    isGroupLeader: async ({ id }, args, { dataSources: { Group } }) => {
      const groups = await Group.getByPerson({ personId: id, asLeader: true });
      return groups.length > 0;
    },
    isStaff: (root, args, { dataSources: { Person } }) =>
      Person.isCurrentPersonStaff(),
  },
};
export default resolverMerge(resolver, originalPerson);
