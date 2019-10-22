import { ContentItem } from '@apollosproject/data-connector-rock';
import gql from 'graphql-tag';

export default gql`
  ${ContentItem.schema}

  type Communicators {
    communicator: Person
    guestCommunicator: String
  }

  extend type WeekendContentItem {
    communicators: Communicators
    sermonDate: String
    series: ContentItem
  }

  extend type DevotionalContentItem {
    series: ContentItem
  }

  extend type Query {
    contentItemFromSlug(slug: String!): ContentItem
  }
`;
