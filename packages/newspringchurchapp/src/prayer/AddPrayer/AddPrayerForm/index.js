import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import {
  ModalView,
  Switch,
  TextInput,
  Button,
  styled,
  FlexedView,
  PaddedView,
} from '@apollosproject/ui-kit';
import AddPrayerHeader from '../AddPrayerHeader';

const StyledButton = styled(() => ({
  borderRadius: 0,
}))(Button);

const BottomView = styled(() => ({
  justifyContent: 'flex-end',
}))(FlexedView);

const AddPrayerForm = memo(({ imgSrc, btnLabel, ...otherProps }) => (
  <ModalView {...otherProps}>
    <FlexedView>
      <AddPrayerHeader imgSrc={imgSrc} />
      {/* TODO: add underline={false} prop to TextInput, 
        pending https://github.com/ApollosProject/apollos-prototype/issues/629 */}
      <PaddedView>
        <TextInput editable placeholder="Start typing your prayer..." />
      </PaddedView>
      <BottomView>
        <PaddedView>
          <Switch label="Anonymous" />
        </PaddedView>
        <StyledButton title={btnLabel} />
      </BottomView>
    </FlexedView>
  </ModalView>
));

AddPrayerForm.propTypes = {
  imgSrc: Image.propTypes,
  btnLabel: PropTypes.string,
};

AddPrayerForm.defaultProps = {
  btnLabel: 'Send prayer to community',
};

AddPrayerForm.displayName = 'AddPrayerForm';
export default AddPrayerForm;
