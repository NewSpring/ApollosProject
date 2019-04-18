import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { Formik } from 'formik';
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
  <Formik
    initialValues={{ prayer: '', anonymous: false }}
    onSubmit={(values) => console.log(values)}
  >
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <ModalView {...otherProps}>
        <FlexedView>
          <AddPrayerHeader imgSrc={imgSrc} />
          {/* TODO: add underline={false} prop to TextInput, 
        pending https://github.com/ApollosProject/apollos-prototype/issues/629 */}
          <PaddedView>
            <TextInput
              editable
              placeholder="Start typing your prayer..."
              onChangeText={handleChange('prayer')}
              onBlur={handleBlur('prayer')}
              value={values.prayer}
            />
          </PaddedView>
          <BottomView>
            <PaddedView>
              <Switch
                label="Anonymous"
                value={values.anonymous}
                onValueChange={handleChange('anonymous')}
              />
            </PaddedView>
            <StyledButton title={btnLabel} onPress={handleSubmit} />
          </BottomView>
        </FlexedView>
      </ModalView>
    )}
  </Formik>
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
