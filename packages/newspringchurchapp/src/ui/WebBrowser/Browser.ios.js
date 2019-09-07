import { Linking } from 'react-native';
import SafariView from 'react-native-safari-view';

const Browser = {
  openURL: async (url, options) => {
    try {
      if (options === 'give') {
        if (!Linking.canOpenURL(url)) throw new Error('URL not supported');
        Linking.openURL(url);
      } else {
        await SafariView.isAvailable();
        SafariView.show({
          url,
          ...options,
        });
      }
    } catch (e) {
      if (!Linking.canOpenURL(url)) throw new Error('URL not supported');
      Linking.openURL(url);
    }
  },
};

export default Browser;
