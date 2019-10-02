import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import {
  TableView,
  Cell,
  CellIcon,
  CellText,
  Divider,
  Touchable,
  styled,
  PaddedView,
  H4,
} from '@apollosproject/ui-kit';
import { UserWebBrowserConsumer } from 'newspringchurchapp/src/user-web-browser';
import { WebBrowserConsumer } from 'newspringchurchapp/src/ui/WebBrowser';
import NavigationActions from 'newspringchurchapp/src/NavigationService';

const RowHeader = styled(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: theme.sizing.baseUnit,
}))(PaddedView);

const Name = styled({
  flexGrow: 1,
})(View);

const ActionTable = ({ isGroupLeader }) => (
  <View>
    <RowHeader>
      <Name>
        <H4>{'Connect with NewSpring'}</H4>
      </Name>
    </RowHeader>
    <TableView>
      <WebBrowserConsumer>
        {(openUrl) => (
          <View>
            <Touchable
              onPress={() =>
                openUrl('https://my.newspring.cc', { externalBrowser: true })
              }
            >
              <Cell>
                <CellText>Give now</CellText>
                <CellIcon name="arrow-next" />
              </Cell>
            </Touchable>
            <Divider />
          </View>
        )}
      </WebBrowserConsumer>
      <UserWebBrowserConsumer>
        {(openUserWebView) => (
          <View>
            <Touchable
              onPress={() =>
                openUserWebView({
                  url: 'https://newspring.cc/serving',
                })
              }
            >
              <Cell>
                <CellText>Find a serving opportunity</CellText>
                <CellIcon name="arrow-next" />
              </Cell>
            </Touchable>
            <Divider />
            <Touchable
              onPress={() =>
                openUserWebView({ url: 'https://newspring.cc/groups/finder' })
              }
            >
              <Cell>
                <CellText>Join a small group</CellText>
                <CellIcon name="arrow-next" />
              </Cell>
            </Touchable>
            {isGroupLeader ? (
              <>
                <Divider />
                <Touchable
                  onPress={() =>
                    openUserWebView({
                      url: 'https://newspring.cc/groups/leader',
                    })
                  }
                >
                  <Cell>
                    <CellText>Manage your group</CellText>
                    <CellIcon name="arrow-next" />
                  </Cell>
                </Touchable>
              </>
            ) : null}
            <Divider />
            <Touchable
              onPress={() =>
                openUserWebView({
                  url: `https://rock.newspring.cc/WorkflowEntry/530`,
                })
              }
            >
              <Cell>
                <CellIcon name="settings" />
                <CellText>Bug Report!</CellText>
              </Cell>
            </Touchable>
            <Divider />
            {process.env.NODE_ENV !== 'production' ? (
              <Touchable
                onPress={() =>
                  NavigationActions.navigate('TestingControlPanel')
                }
              >
                <Cell>
                  <CellIcon name="settings" />
                  <CellText>Open Testing Panel</CellText>
                </Cell>
              </Touchable>
            ) : null}
          </View>
        )}
      </UserWebBrowserConsumer>
    </TableView>
  </View>
);

ActionTable.propTypes = {
  isGroupLeader: PropTypes.bool,
};

const StyledActionTable = styled(({ theme }) => ({
  paddingBottom: theme.sizing.baseUnit * 100,
}))(ActionTable);

export default StyledActionTable;
