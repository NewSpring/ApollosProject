import { Person } from '@apollosproject/data-connector-rock';
import gql from 'graphql-tag';

const peopleSchema = gql`
  ${Person.schema}

  extend type Person {
    impersonationParameter: String! @deprecated(reason: "No longer used.")
    isGroupLeader: Boolean
    isStaff: Boolean
  }
`;

export default peopleSchema;
