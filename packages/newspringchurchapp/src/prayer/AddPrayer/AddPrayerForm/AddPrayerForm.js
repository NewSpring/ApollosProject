import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { View, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
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
import PrayerHeader from '../../PrayerHeader';

const FlexedSafeAreaView = styled({
  flex: 1,
})(SafeAreaView);

const ShrinkingView = styled(({ theme }) => ({
  flex: 1,
  paddingTop: theme.sizing.baseUnit,
}))(KeyboardAvoidingView);

const StyledTextInput = styled({
  height: '100%',
})(TextInput);

const StyledButton = styled({
  borderRadius: 0,
})(Button);

const BottomView = styled({
  justifyContent: 'flex-end',
})(FlexedView);

const SwitchContainer = styled({
  width: '70%',
  alignSelf: 'center',
  justifyContent: 'center',
})(PaddedView);

const StyledPrayerHeaderView = styled(({ theme }) => ({
  marginBottom: theme.sizing.baseUnit,
}))(View);

const AddPrayerForm = memo(
  ({ onSubmit, avatarSource, title, btnLabel, ...props }) => (
    <Formik
      initialValues={{ prayer: '', anonymous: false }}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <ModalView {...props}>
          <FlexedSafeAreaView forceInset={{ top: 'always', bottom: 'never' }}>
            <ShrinkingView behavior={'padding'}>
              <StyledPrayerHeaderView>
                <PrayerHeader
                  avatarSource={values.anonymous ? null : avatarSource}
                  avatarSize={'medium'}
                  name={title}
                />
              </StyledPrayerHeaderView>
              <FlexedView>
                <PaddedView>
                  <StyledTextInput
                    editable
                    multiline
                    placeholder="Start typing your prayer..."
                    onChangeText={handleChange('prayer')}
                    onBlur={handleBlur('prayer')}
                    value={values.prayer}
                    underline={false}
                  />
                </PaddedView>
              </FlexedView>
              <BottomView>
                <SwitchContainer>
                  <Switch
                    value={values.anonymous}
                    onValueChange={handleChange('anonymous')}
                    label={'Share Anonymously'}
                  />
                </SwitchContainer>
                <StyledButton title={btnLabel} onPress={handleSubmit} />
              </BottomView>
            </ShrinkingView>
          </FlexedSafeAreaView>
        </ModalView>
      )}
    </Formik>
  )
);

AddPrayerForm.propTypes = {
  onSubmit: PropTypes.func,
  avatarSource: PropTypes.shape({
    uri: PropTypes.string,
  }),
  title: PropTypes.string,
  btnLabel: PropTypes.string,
};

AddPrayerForm.defaultProps = {
  title: 'Ask for prayer',
  btnLabel: 'Send prayer to community',
};

AddPrayerForm.displayName = 'AddPrayerForm';

export default AddPrayerForm;
