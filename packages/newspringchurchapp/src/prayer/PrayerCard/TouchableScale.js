import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, TouchableWithoutFeedback, Vibration } from 'react-native';

class TouchableScale extends Component {
  static propTypes = {
    minScale: PropTypes.number,
    springConfig: PropTypes.shape({}),
    active: PropTypes.bool,
    style: PropTypes.any, // eslint-disable-line
    children: PropTypes.any, // eslint-disable-line
  };

  static defaultProps = {
    minScale: 0.95,
    springConfig: {
      speed: 20,
    },
  };

  scale = new Animated.Value(this.props.active ? this.props.minScale : 1);

  border = new Animated.Value(this.props.active ? 1 : 0);

  opacity = new Animated.Value(this.props.active ? 0 : 1);

  animatedStyle = {
    transform: [{ scale: this.scale }],
    borderTopWidth: this.border.interpolate({
      inputRange: [0, 0.25, 0.5, 0.75, 1],
      outputRange: [0, 1, 1, 1, 1],
    }),
    borderRightWidth: this.border.interpolate({
      inputRange: [0, 0.25, 0.5, 0.75, 1],
      outputRange: [0, 0, 1, 1, 1],
    }),
    borderBottomWidth: this.border.interpolate({
      inputRange: [0, 0.25, 0.5, 0.75, 1],
      outputRange: [0, 0, 0, 1, 1],
    }),
    borderLeftWidth: this.border.interpolate({
      inputRange: [0, 0.25, 0.5, 0.75, 1],
      outputRange: [0, 0, 0, 0, 1],
    }),
    opacity: this.opacity,
  };

  handlePressIn = () => {
    Vibration.vibrate([0, 2000, 2000]);
    Animated.sequence([
      Animated.parallel([
        Animated.spring(this.scale, {
          toValue: this.props.minScale,
          isInteraction: false,
          ...this.props.springConfig,
        }),

        Animated.timing(this.border, {
          toValue: 1,
          duration: 3000,
        }),
      ]),
      Animated.timing(this.opacity, {
        toValue: 0,
        duration: 1000,
      }),
    ]).start();
  };

  handlePressOut = () => {
    Vibration.cancel();
    Animated.sequence([
      Animated.timing(this.opacity, {
        toValue: 1,
        duration: 1000,
      }),
      Animated.parallel([
        Animated.spring(this.scale, {
          toValue: 1,
          isInteraction: false,
          ...this.props.springConfig,
        }),
        Animated.timing(this.border, {
          toValue: 0,
          duration: 3000,
        }),
      ]),
    ]).start();
  };

  render() {
    const { minScale, style, children, ...touchableProps } = this.props;
    return (
      <TouchableWithoutFeedback
        {...touchableProps}
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
      >
        <Animated.View style={[this.animatedStyle, style]}>
          {children}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

export default TouchableScale;
