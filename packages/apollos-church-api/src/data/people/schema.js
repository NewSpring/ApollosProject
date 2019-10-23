import gql from 'graphql-tag';

const peopleSchema = gql`
  extend type Person {
    isGroupLeader: Boolean
    isStaff: Boolean
  }
`;

export default peopleSchema;
