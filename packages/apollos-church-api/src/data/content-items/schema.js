import { ContentItem } from '@apollosproject/data-connector-rock';
import gql from 'graphql-tag';

export default gql`
  ${ContentItem.schema}
  extend type WeekendContentItem {
    communicator: Person
    sermonDate: String
  }
`;
