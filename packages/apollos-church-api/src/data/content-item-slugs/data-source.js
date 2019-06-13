import RockApolloDataSource from '@apollosproject/rock-apollo-data-source';
import ApollosConfig from '@apollosproject/config';

const { ROCK } = ApollosConfig;

export default class ContentChannelItemSlug extends RockApolloDataSource {
  resource = 'ContentChannelItemSlugs';

  getShareURL = async (id, contentChannelId, dataSources) => {
    try {
      const contentChannel = await dataSources.ContentChannel.getFromId(
        contentChannelId
      );
      const slug = await this.request('ContentChannelItemSlugs')
        .filter(`ContentChannelItemId eq ${id}`)
        .get();
      return ROCK.SHARE_URL + contentChannel.channelUrl + '/' + slug[0].slug;
    } catch (error) {
      return '';
    }
  };
}
