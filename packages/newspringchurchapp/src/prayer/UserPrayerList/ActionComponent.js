import React from 'react';
import ActionSheet from 'react-native-actionsheet';
import PropTypes from 'prop-types';
import { Icon, Touchable, withTheme } from '@apollosproject/ui-kit';

const DeleteIcon = withTheme(({ theme }) => ({
  name: 'close',
  size: theme.sizing.baseUnit,
  fill: theme.colors.wordOfChrist,
}))(Icon);

class ActionComponent extends React.Component {
  handleShowActionSheet = () => {
    this.ActionSheet.show();
  };

  render() {
    const { options } = this.props;
    return (
      <>
        <Touchable onPress={this.handleShowActionSheet}>
          <DeleteIcon />
        </Touchable>
        <ActionSheet
          ref={(sheet) => {
            this.ActionSheet = sheet;
          }}
          options={options.map((option) => option.title)}
          cancelButtonIndex={options.length - 1}
          destructiveButtonIndex={options
            .map((option) => option.destructive)
            .indexOf(true)}
          onPress={async (index) => {
            if (index === 0) {
              options[0].method();
            }
          }}
        />
      </>
    );
  }
}

ActionComponent.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({})),
};

export default ActionComponent;
