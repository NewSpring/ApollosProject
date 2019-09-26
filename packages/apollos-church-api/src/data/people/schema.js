import gql from 'graphql-tag';

const peopleSchema = gql`
  extend type Person {
    impersonationParameter: String!
    isGroupLeader: Boolean
  }
`;

export default peopleSchema;
