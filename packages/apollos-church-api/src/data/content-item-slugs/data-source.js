import RockApolloDataSource from '@apollosproject/rock-apollo-data-source';
import ApollosConfig from '@apollosproject/config';

const { ROCK } = ApollosConfig;

export default class ContentChannelItemSlug extends RockApolloDataSource {
  resource = 'ContentChannelItemSlugs';

  getShareURL = async (id, contentChannelId) => {
    try {
      const contentChannel = await this.context.dataSources.ContentChannel.getFromId(
        contentChannelId
      );
      const slug = await this.request('ContentChannelItemSlugs')
        .filter(`ContentChannelItemId eq ${id}`)
        .first();
      return `${ROCK.SHARE_URL + contentChannel.channelUrl}/${slug.slug}`;
    } catch (error) {
      return '';
    }
  };
}
