import { Person as originalPerson } from '@apollosproject/data-connector-rock';
import { resolverMerge } from '@apollosproject/server-core';

const resolver = {
  Person: {
    impersonationParameter: ({ id }, args, { dataSources }) =>
      dataSources.ExtendedPerson.getImpersonationParameter({ id }),
    isGroupLeader: async ({ id }, args, { dataSources: { Group } }) => {
      const groups = await Group.getByPerson({ personId: id, asLeader: true });
      return groups.length > 0;
    },
  },
};
export default resolverMerge(resolver, originalPerson);
