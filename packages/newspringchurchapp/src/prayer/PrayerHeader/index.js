import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Avatar, H3, H6, styled } from '@apollosproject/ui-kit';

const StyledView = styled(() => ({
  alignItems: 'center',
}))(View);

const StyledAvatarView = styled(({ theme }) => ({
  marginBottom: theme.sizing.baseUnit * 0.5,
}))(View);

const GreyH6 = styled(({ theme }) => ({
  color: theme.colors.text.tertiary,
}))(H6);

const PrayerHeader = (props) => (
  <StyledView>
    {props.anonymous ? (
      <>
        <StyledAvatarView>
          <Avatar size={props.avatarSize} />
        </StyledAvatarView>
        <H3>Pray For Request</H3>
      </>
    ) : (
      <>
        <StyledAvatarView>
          <Avatar source={props.avatarSource} size={props.avatarSize} />
        </StyledAvatarView>
        <H3>{props.name}</H3>
        {props.source ? <GreyH6>{props.source}</GreyH6> : null}
      </>
    )}
  </StyledView>
);

PrayerHeader.propTypes = {
  anonymous: PropTypes.bool,
  avatarSize: PropTypes.string,
  avatarSource: PropTypes.shape({ uri: PropTypes.string }),
  name: PropTypes.string,
  source: PropTypes.string,
};

PrayerHeader.defaultProps = {
  anonymous: false,
  avatarSize: 'small',
  name: 'Request',
  source: '',
};

export default PrayerHeader;
