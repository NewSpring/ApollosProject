import React, { PureComponent } from 'react';
import Config from 'react-native-config';
import { throttle } from 'lodash';

import { BackgroundView } from '@apollosproject/ui-kit';

import SearchInputHeader, {
  ReactNavigationStyleReset,
} from '../../ui/SearchInputHeader';

import SearchFeed from './SearchFeed';
import DiscoverFeed from './DiscoverFeed';

class Discover extends PureComponent {
  state = {
    searchText: '',
    isFocused: false,
  };

  handleOnChangeText = throttle(
    (value) =>
      this.setState({
        searchText: value,
      }),
    300
  );

  handleOnFocus = (inputState) => {
    this.setState({
      isFocused: inputState,
    });
  };

  render() {
    return (
      <BackgroundView>
        {Config.EXPERIMENTAL === 'true' ? (
          <SearchInputHeader
            onChangeText={this.handleOnChangeText}
            onFocus={this.handleOnFocus}
          />
        ) : null}
        {this.state.isFocused || this.state.searchText ? (
          <SearchFeed searchText={this.state.searchText} />
        ) : (
          <DiscoverFeed />
        )}
      </BackgroundView>
    );
  }
}

Discover.navigationOptions = {
  title: 'Discover',
  headerStyle: ReactNavigationStyleReset.header,
};

export default Discover;
