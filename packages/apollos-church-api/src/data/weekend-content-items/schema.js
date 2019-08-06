import gql from 'graphql-tag';

export default gql`
  extend type WeekendContentItem {
    communicator: Person
    sermonDate: String
  }
`;
