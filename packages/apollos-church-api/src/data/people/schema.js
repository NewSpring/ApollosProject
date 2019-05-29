import gql from 'graphql-tag';

const peopleSchema = gql`
  extend type Person {
    impersonationParameter: String!
  }
`;

export default peopleSchema;
