import { Person as originalPerson } from '@apollosproject/data-connector-rock';
import { resolverMerge } from '@apollosproject/server-core';

const resolver = {
  Person: {
    // deprecated
    impersonationParameter: () => 'deprecatedtoken',
    isGroupLeader: async ({ id }, args, { dataSources: { Group } }) => {
      const groups = await Group.getByPerson({ personId: id, asLeader: true });
      return groups.length > 0;
    },
    isStaff: ({ id }, args, { dataSources: { Person } }) => Person.isStaff(id),
    photo: ({ photo: { path } }) => ({ uri: path }),
  },
};
export default resolverMerge(resolver, originalPerson);
