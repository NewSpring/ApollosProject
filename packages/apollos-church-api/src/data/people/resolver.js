import { Person as originalPerson } from '@apollosproject/data-connector-rock';
import { resolverMerge } from '@apollosproject/server-core';

const resolver = {
  Person: {
    impersonationParameter: ({ id }, args, { dataSources }) =>
      dataSources.ExtendedPerson.getImpersonationParameter({ id }),
  },
};
export default resolverMerge(resolver, originalPerson);
