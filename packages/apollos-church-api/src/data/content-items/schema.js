import { ContentItem } from '@apollosproject/data-connector-rock';
import gql from 'graphql-tag';

export default gql`
  ${ContentItem.schema}

  extend type WeekendContentItem {
    communicators: [Person]
    guestCommunicators: [String]
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
