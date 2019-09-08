import { Linking } from 'react-native';
import SafariView from 'react-native-safari-view';

const Browser = {
  openURL: async (url, { externalBrowser, ...options }) => {
    const openWithSafari = () => {
      if (!Linking.canOpenURL(url)) throw new Error('URL not supported');
      Linking.openURL(url);
    };
    if (!externalBrowser) {
      openWithSafari();
    } else {
      try {
        await SafariView.isAvailable();
        SafariView.show({
          url,
          ...options,
        });
      } catch (e) {
        openWithSafari();
      }
    }
  },
};

export default Browser;
