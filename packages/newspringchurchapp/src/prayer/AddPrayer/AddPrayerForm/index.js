import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import { Formik } from 'formik';
import {
  ModalView,
  Switch,
  TextInput,
  Button,
  styled,
  FlexedView,
  PaddedView,
  H5,
} from '@apollosproject/ui-kit';
import AddPrayerHeader from '../AddPrayerHeader';

const StyledTextInput = styled(() => ({
  height: '100%',
}))(TextInput);

const StyledButton = styled(() => ({
  borderRadius: 0,
}))(Button);

const BottomView = styled(() => ({
  justifyContent: 'flex-end',
}))(FlexedView);

const SwitchContainer = styled(() => ({
  width: '70%',
  alignSelf: 'center',
  flexDirection: 'row',
  justifyContent: 'center',
}))(PaddedView);

const SwitchLabel = styled(({ theme }) => ({
  color: theme.colors.primary,
}))(H5);

const SwitchLabelContainer = styled(({ theme }) => ({
  justifyContent: 'center',
  marginLeft: theme.sizing.baseUnit,
}))(View);

const AddPrayerForm = memo(({ imgSrc, btnLabel, ...otherProps }) => (
  <Formik
    initialValues={{ prayer: '', anonymous: false }}
    onSubmit={(values) => console.log(values)}
  >
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <ModalView {...otherProps}>
        <FlexedView>
          <AddPrayerHeader imgSrc={values.anonymous ? null : imgSrc} />
          {/* TODO: add underline={false} prop to TextInput, 
        pending https://github.com/ApollosProject/apollos-prototype/issues/629 */}
          <FlexedView>
            <PaddedView>
              <StyledTextInput
                editable
                multiline
                placeholder="Start typing your prayer..."
                onChangeText={handleChange('prayer')}
                onBlur={handleBlur('prayer')}
                value={values.prayer}
              />
            </PaddedView>
          </FlexedView>
          <BottomView>
            <SwitchContainer>
              <Switch
                value={values.anonymous}
                onValueChange={handleChange('anonymous')}
              />
              <SwitchLabelContainer>
                <SwitchLabel>Share Anonymously</SwitchLabel>
              </SwitchLabelContainer>
            </SwitchContainer>
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
