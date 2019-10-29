import React, { PureComponent } from 'react';
import { TableView, Divider } from '@apollosproject/ui-kit';
import { UserWebBrowserConsumer } from 'newspringchurchapp/src/user-web-browser';
import { WebBrowserConsumer } from 'newspringchurchapp/src/ui/WebBrowser';
import ChangeLivestream from './ChangeLivestream';
import TouchableCell from './TouchableCell';

export default class TestingControlPanel extends PureComponent {
  static navigationOptions = () => ({
    title: 'Testing Control Panel',
  });

  render() {
    return (
      <TableView>
        <ChangeLivestream />
        <Divider />
        <UserWebBrowserConsumer>
          {(openUserWebView) => (
            <TouchableCell
              handlePress={() =>
                openUserWebView({
                  url:
                    'https://www.whatismybrowser.com/detect/what-http-headers-is-my-browser-sending',
                })
              }
              iconName="share"
              cellText={`Open Web Browser With User Cookie`}
            />
          )}
        </UserWebBrowserConsumer>
        <WebBrowserConsumer>
          {(openUrl) => (
            <>
              <TouchableCell
                handlePress={() =>
                  openUrl(
                    'https://rock.newspring.cc',
                    {},
                    { useRockToken: true }
                  )
                }
                iconName="share"
                cellText={`Open InAppBrowser With Rock Token`}
              />
              <TouchableCell
                handlePress={() => openUrl('https://rock.newspring.cc')}
                iconName="share"
                cellText={`Open InAppBrowser With One Argument`}
              />
            </>
          )}
        </WebBrowserConsumer>
        <TouchableCell
          handlePress={() => this.props.navigation.navigate('Onboarding')}
          iconName="Avatar"
          cellText={`Launch Onboarding`}
        />
      </TableView>
    );
  }
}
