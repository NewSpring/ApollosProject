import React from 'react';
import ActionSheet from 'react-native-actionsheet';
import PropTypes from 'prop-types';
import { Icon, Touchable } from '@apollosproject/ui-kit';

class ActionComponent extends React.Component {
  handleShowActionSheet = () => {
    this.ActionSheet.show();
  };

  render() {
    const { options } = this.props;
    return (
      <>
        <Touchable onPress={this.handleShowActionSheet}>
          <Icon name="close" size={18} />
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
