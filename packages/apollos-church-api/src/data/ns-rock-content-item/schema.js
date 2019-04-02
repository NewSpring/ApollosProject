// import { contentItemSchema } from '@apollosproject/data-schema';
import { gql } from 'apollo-server';

export default gql`
  type NewSpringContentItem implements ContentItem & Node {
    id: ID!
    title: String
    coverImage: ImageMedia
    images: [ImageMedia]
    videos: [VideoMedia]
    audios: [AudioMedia]
    htmlContent: String
    summary: String
    childContentItemsConnection(
      first: Int
      after: String
    ): ContentItemsConnection
    siblingContentItemsConnection(
      first: Int
      after: String
    ): ContentItemsConnection
    parentChannel: ContentChannel
    theme: Theme
    isLiked: Boolean
    likedCount: Int
    sharing: SharableContentItem
  }
`;
