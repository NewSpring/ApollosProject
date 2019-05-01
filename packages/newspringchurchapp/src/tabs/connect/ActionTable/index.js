import React from 'react';
import { View } from 'react-native';

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

const ActionTable = () => (
  <WebBrowserConsumer>
    {(openUrl) => (
      <View>
        <RowHeader>
          <Name>
            <H4>{'Connect with Apollos'}</H4>
          </Name>
        </RowHeader>
        <TableView>
          <Touchable
            onPress={() => openUrl('https://rock.newspring.cc/Workflows/431')}
          >
            <Cell>
              <CellIcon name="check" />
              <CellText>Find a serving opportunity</CellText>
            </Cell>
          </Touchable>
          <Divider />
          <Touchable onPress={() => openUrl('https://my.newspring.cc/groups')}>
            <Cell>
              <CellIcon name="groups" />
              <CellText>Join a small group</CellText>
            </Cell>
          </Touchable>
          <Divider />
          <Touchable
            onPress={() => openUrl('https://apollosrock.newspring.cc/page/186')}
          >
            <Cell>
              <CellIcon name="download" />
              <CellText>I would like to give</CellText>
            </Cell>
          </Touchable>
        </TableView>
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
      </View>
    )}
  </WebBrowserConsumer>
);

const StyledActionTable = styled(({ theme }) => ({
  paddingBottom: theme.sizing.baseUnit * 100,
}))(ActionTable);

export default StyledActionTable;
