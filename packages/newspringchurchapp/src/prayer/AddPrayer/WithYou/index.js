import React, { memo } from 'react';
import { SafeAreaView } from 'react-navigation';
import {
  ModalView,
  FlexedView,
  PaddedView,
  styled,
  Button,
  ButtonLink,
  BodyText,
  Icon,
  H1,
  withTheme,
} from '@apollosproject/ui-kit';

const FlexedSafeAreaView = styled(({ theme }) => ({
  flex: 1,
  paddingHorizontal: theme.sizing.baseUnit,
}))(SafeAreaView);

const MessageView = styled({
  flex: 4,
  justifyContent: 'center',
})(FlexedView);

const BrandIcon = withTheme(({ theme }) => ({
  name: 'brand-icon',
  size: theme.sizing.baseUnit * 4,
  fill: theme.colors.primary,
}))(Icon);

const Title = styled(({ theme }) => ({
  marginVertical: theme.sizing.baseUnit,
  color: theme.colors.primary,
}))(H1);

const Footer = styled({
  justifyContent: 'flex-end',
})(FlexedView);

const FooterAltOption = styled({
  alignSelf: 'center',
})(PaddedView);

const FooterText = styled(({ theme }) => ({
  color: theme.colors.tertiary,
}))(BodyText);

const WithYou = memo(({ ...props }) => (
  <ModalView {...props} onClose={() => props.navigation.navigate('Prayer')}>
    <FlexedSafeAreaView>
      <MessageView>
        <BrandIcon />
        <Title>The NewSpring family is with you in prayer</Title>
        <BodyText>
          Thank you for sharing your prayer request. We will all be praying for
          you.
        </BodyText>
      </MessageView>
      <Footer>
        <Button
          title="Pray for Others"
          onPress={() => props.navigation.navigate('PrayerList')}
        />
        <FooterAltOption>
          <ButtonLink onPress={() => props.navigation.pop()}>
            <FooterText>Add Another Prayer Request</FooterText>
          </ButtonLink>
        </FooterAltOption>
      </Footer>
    </FlexedSafeAreaView>
  </ModalView>
));

WithYou.displayName = 'WithYou';

WithYou.navigationOptions = {
  header: null,
};

export default WithYou;
