import { dataSources } from './data';

export default () => ({
  liveStream: new dataSources.LiveStream(),
  scripture: new dataSources.ESVScripture(),
});
