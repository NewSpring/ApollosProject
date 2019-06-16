import RockApolloDataSource from '@apollosproject/rock-apollo-data-source';
import ApollosConfig from '@apollosproject/config';

const { ROCK } = ApollosConfig;

export default class ContentChannelItemSlug extends RockApolloDataSource {
  resource = 'ContentChannelItemSlugs';

  getShareURL = async (id, contentChannelId) => {
    try {
      console.log('id = ', id);
      console.log('contentChannelId = ', contentChannelId);
      const contentChannel = await this.context.dataSources.ContentChannel.getFromId(
        contentChannelId
      );
      console.log('contentChannel = ', contentChannel);
      const slug = await this.request('ContentChannelItemSlugs')
        .filter(`ContentChannelItemId eq ${id}`)
        .get();
      console.log('slug');
      return ROCK.SHARE_URL + contentChannel.channelUrl + '/' + slug[0].slug;
    } catch (error) {
      return '';
    }
  };
}
