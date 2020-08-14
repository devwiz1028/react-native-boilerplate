import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {View, Animated, Easing, StyleSheet} from 'react-native';

import Indicator from './Indicator';

const LINE_WIDTH = 3.5;

export default class MaterialIndicator extends PureComponent {
  static defaultProps = {
    animationDuration: 2400,

    color: 'rgb(0, 0, 0)',
    size: 40,
  };

  static propTypes = {
    ...Indicator.propTypes,

    animationDuration: PropTypes.number,
    color: PropTypes.string,
    size: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.renderComponent = this.renderComponent.bind(this);
  }

  renderComponent({index, progress}) {
    const {size, color, animationDuration} = this.props;

    const frames = (60 * animationDuration) / 1000;
    const easing = Easing.linear;

    const inputRange = Array.from(
      new Array(frames),
      (item, frameIndex) => frameIndex / (frames - 1),
    );

    const outputRange = Array.from(new Array(frames), (item, frameIndex) => {
      let p = (2 * frameIndex) / (frames - 1);
      const rotation = index ? +(360 - 15) : -(180 - 15);

      if (p > 1.0) {
        p = 2.0 - p;
      }

      const direction = index ? -1 : +1;

      return `${direction * (180 - 30) * easing(0.5 + p * 0.5) + rotation}deg`;
    });

    const layerStyle = {
      width: size,
      height: size,
      transform: [
        {
          rotate: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [`${0 + 30 + 15}deg`, `${2 * 360 + 30 + 15}deg`],
          }),
        },
      ],
    };

    const viewportStyle = {
      width: size,
      height: size,
      transform: [
        {
          translateY: index ? -size / 2 : 0,
        },
        {
          rotate: progress.interpolate({inputRange, outputRange}),
        },
      ],
    };

    const containerStyle = {
      width: size,
      height: size / 2,
      overflow: 'hidden',
    };

    const offsetStyle = index ? {top: size / 2} : null;

    const lineStyle = {
      width: size,
      height: size,
      borderColor: color,
      borderWidth: LINE_WIDTH,
      borderRadius: size / 2,
    };

    return (
      <Animated.View style={styles.layer} key={index}>
        <Animated.View style={layerStyle}>
          <Animated.View
            style={[containerStyle, offsetStyle]}
            collapsable={false}>
            <Animated.View style={viewportStyle}>
              <Animated.View style={containerStyle} collapsable={false}>
                <Animated.View style={lineStyle} />
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    );
  }

  render() {
    const {color, style, size: width, size: height, ...otherProps} = this.props;

    const bgStyle = {
      position: 'absolute',
      width,
      height,
      borderRadius: width / 2,
      borderColor: otherProps.color,
      opacity: 0.15,
      borderWidth: LINE_WIDTH,
    };

    return (
      <View style={[styles.container, style]}>
        <View style={bgStyle} />
        <Indicator
          style={{width, height}}
          renderComponent={this.renderComponent}
          {...otherProps}
          count={2}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  layer: {
    ...StyleSheet.absoluteFillObject,

    justifyContent: 'center',
    alignItems: 'center',
  },
});
