import React from 'react';
import PropTypes from 'prop-types';
import {Animated} from 'react-native';

import {Colors} from '../../constants';
import {Easing} from '../../../utils';

class AnimatableView extends React.Component {
  constructor(props) {
    super(props);

    this.centerX = new Animated.Value(this.getValue(props, 'centerX'));
    this.centerY = new Animated.Value(this.getValue(props, 'centerY'));
    this.width = new Animated.Value(this.getValue(props, 'width'));
    this.height = new Animated.Value(this.getValue(props, 'height'));
    this.opacity = new Animated.Value(this.getValue(props, 'opacity'));
    this.scale = new Animated.Value(this.getValue(props, 'scale'));
    this.background = new Animated.Value(1);
    this.borderRadius = new Animated.Value(
      this.getValue(props, 'borderRadius'),
    );
    this.fromBackground = this.getValue(props, 'background');
    this.toBackground = this.getValue(props, 'background');

    this.animations = [];
  }

  componentWillReceiveProps(nextProps) {
    const animations = [];
    const keys = [
      'centerX',
      'centerY',
      'width',
      'height',
      'opacity',
      'scale',
      'background',
      'borderRadius',
    ];

    keys.forEach((key) => {
      if (this.hasDataChange(nextProps, key)) {
        const newData = nextProps.data || {};
        const newProp = newData[key] || {};
        let {animate} = newProp;
        let newValue = this.getValue(nextProps, key);
        if (key === 'background') {
          this.fromBackground = this.toBackground;
          this.toBackground = newValue;
          if (animate) {
            this[key].setValue(0);
          }
          newValue = 1;
        } else if (key === 'centerX' || key === 'centerY') {
          animate = animate || (newData.center || {}).animate;
        } else if (key === 'width' || key === 'height') {
          animate = animate || (newData.size || {}).animate;
        }

        if (animate) {
          const {
            type = 'timing',
            delay = 0,
            duration,
            easing = Easing.default,
            tension = 40,
            friction = 7,
          } = animate;
          if (type === 'timing') {
            animations.push(
              Animated.timing(this[key], {
                toValue: newValue,
                delay,
                duration,
                easing,
              }),
            );
          } else if (type === 'spring') {
            animations.push(
              Animated.spring(this[key], {
                toValue: newValue,
                delay,
                tension,
                friction,
              }),
            );
          }
        } else {
          this[key].setValue(newValue);
        }
      }
    });

    if (animations.length > 0) {
      if (this.animations.length > 0) {
        Animated.parallel(this.animations).stop();
      }
      this.animations = animations;
      Animated.parallel(this.animations).start();
    }
  }

  getValue(props, key) {
    const data = props.data || {};
    let defaultValue = 0;

    if (key === 'centerX') {
      if (data.centerX) {
        return data.centerX.value;
      } else if (data.center) {
        return data.center.value[0];
      }
    } else if (key === 'centerY') {
      if (data.centerY) {
        return data.centerY.value;
      } else if (data.center) {
        return data.center.value[1];
      }
    } else if (key === 'width') {
      if (data.width) {
        return data.width.value;
      } else if (data.size) {
        return data.size.value[0];
      }
    } else if (key === 'height') {
      if (data.height) {
        return data.height.value;
      } else if (data.size) {
        return data.size.value[1];
      }
    } else if (key === 'opacity') {
      defaultValue = 1;
      if (data.opacity) {
        return data.opacity.value;
      }
    } else if (key === 'scale') {
      defaultValue = 1;
      if (data.scale) {
        return data.scale.value;
      }
    } else if (key === 'background') {
      const style = props.style || {};
      defaultValue = style.backgroundColor || Colors.transparent;
      if (data.background) {
        return data.background.value;
      }
    } else if (key === 'borderRadius') {
      if (data.borderRadius) {
        return data.borderRadius.value;
      }
    }

    return defaultValue;
  }

  getStyle() {
    return {
      position: 'absolute',
      width: this.width,
      height: this.height,
      left: this.centerX,
      top: this.centerY,
      opacity: this.opacity,
      transform: [
        {
          translateX: this.width.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -0.5],
          }),
        },
        {
          translateY: this.height.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -0.5],
          }),
        },
        {scale: this.scale},
      ],
      backgroundColor: this.background.interpolate({
        inputRange: [0, 1],
        outputRange: [this.fromBackground, this.toBackground],
      }),
      borderRadius: this.borderRadius,
      ...this.props.style,
    };
  }

  hasDataChange(nextProps, key) {
    const curValue = this.getValue(this.props, key);
    const newValue = this.getValue(nextProps, key);
    return curValue !== newValue;
  }

  render() {
    const {style, data, children, ...otherProps} = this.props;
    return (
      <Animated.View style={this.getStyle()} {...otherProps}>
        {children}
      </Animated.View>
    );
  }
}

AnimatableView.propTypes = {
  style: PropTypes.object,
  data: PropTypes.object,
  children: PropTypes.node,
};

AnimatableView.defaultProps = {
  style: null,
  data: null,
  children: null,
};

export default AnimatableView;
