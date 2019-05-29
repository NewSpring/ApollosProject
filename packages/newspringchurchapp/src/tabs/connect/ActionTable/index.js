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

const ActionTable = ({ token }) => (
  <WebBrowserConsumer>
    {(openUrl) => (
      <View>
        <RowHeader>
          <Name>
            <H4>{'Connect with NewSpring'}</H4>
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
          <Touchable onPress={() => openUrl('https://my.newspring.cc')}>
            <Cell>
              <CellIcon name="download" />
              <CellText>I would like to give</CellText>
            </Cell>
          </Touchable>
        </TableView>
        <TableView>
          <Touchable
            onPress={() =>
              openUrl(
                `https://beta-rock.newspring.cc/workflows/530?rckipid=${token}&Source=3`
              )
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
  </WebBrowserConsumer>
);

ActionTable.propTypes = {
  token: PropTypes.string,
};

const StyledActionTable = styled(({ theme }) => ({
  paddingBottom: theme.sizing.baseUnit * 100,
}))(ActionTable);

export default StyledActionTable;
