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

const ActionTable = ({ token, isGroupLeader }) => (
  <UserWebBrowserConsumer>
    {(openUserWebView) => (
      <View>
        <RowHeader>
          <Name>
            <H4>{'Connect with NewSpring'}</H4>
          </Name>
        </RowHeader>
        <TableView>
          {process.env.NODE_ENV === 'production' ? (
            <Touchable
              onPress={() =>
                openUserWebView({
                  url: 'https://my.newspring.cc',
                })
              }
            >
              <Cell>
                <CellText>Give now</CellText>
                <CellIcon name="arrow-next" />
              </Cell>
            </Touchable>
          ) : null}
          <Divider />
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
                  openUserWebView({ url: 'https://newspring.cc/groups/leader' })
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
        </TableView>
        <TableView>
          <Touchable
            onPress={() =>
              openUserWebView({
                url: `https://rock.newspring.cc/WorkflowEntry/530?rckipid=${token}&Source=3`,
              })
            }
          >
            <Cell>
              <CellIcon name="settings" />
              <CellText>Bug Report!</CellText>
            </Cell>
          </Touchable>
        </TableView>
        {process.env.NODE_ENV !== 'production' ? (
          <TableView>
            <Touchable
              onPress={() => NavigationActions.navigate('TestingControlPanel')}
            >
              <Cell>
                <CellIcon name="settings" />
                <CellText>Open Testing Panel</CellText>
              </Cell>
            </Touchable>
          </TableView>
        ) : null}
      </View>
    )}
  </UserWebBrowserConsumer>
);

ActionTable.propTypes = {
  token: PropTypes.string,
  isGroupLeader: PropTypes.bool,
};

const StyledActionTable = styled(({ theme }) => ({
  paddingBottom: theme.sizing.baseUnit * 100,
}))(ActionTable);

export default StyledActionTable;
