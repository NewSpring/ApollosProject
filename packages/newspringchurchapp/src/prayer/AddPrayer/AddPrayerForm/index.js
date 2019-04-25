import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
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
  H3,
  H5,
  Avatar,
} from '@apollosproject/ui-kit';

const FlexedSafeAreaView = styled({
  flex: 1,
})(SafeAreaView);

const HeaderView = styled({
  alignItems: 'center',
})(View);

const TitleView = styled(({ theme }) => ({
  marginTop: theme.sizing.baseUnit * 0.5,
  marginBottom: theme.sizing.baseUnit * 2,
}))(View);

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
  flexDirection: 'row',
  justifyContent: 'center',
})(PaddedView);

const SwitchLabel = styled(({ theme }) => ({
  color: theme.colors.primary,
}))(H5);

const SwitchLabelContainer = styled(({ theme }) => ({
  justifyContent: 'center',
  marginLeft: theme.sizing.baseUnit,
}))(View);

const AddPrayerForm = memo(({ imgSrc, title, btnLabel, ...props }) => (
  <Formik
    initialValues={{ prayer: '', anonymous: false }}
    onSubmit={(values) => console.log(values)}
  >
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <ModalView {...props}>
        <FlexedSafeAreaView forceInset={{ top: 'always', bottom: 'never' }}>
          <HeaderView>
            <Avatar source={values.anonymous ? null : imgSrc} size={'medium'} />
            <TitleView>
              <H3>{title}</H3>
            </TitleView>
          </HeaderView>
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
            <StyledButton title={btnLabel} onPress={() => console.log(props)} />
          </BottomView>
        </FlexedSafeAreaView>
      </ModalView>
    )}
  </Formik>
));

AddPrayerForm.propTypes = {
  imgSrc: Image.propTypes,
  title: PropTypes.string,
  btnLabel: PropTypes.string,
};

AddPrayerForm.defaultProps = {
  title: 'Ask for prayer',
  btnLabel: 'Send prayer to community',
};

AddPrayerForm.displayName = 'AddPrayerForm';
export default AddPrayerForm;
