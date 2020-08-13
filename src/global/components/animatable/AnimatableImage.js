import React from 'react';
import PropTypes from 'prop-types';
import {Animated} from 'react-native';

import AnimatableView from './AnimatableView';

class AnimatableImage extends AnimatableView {
  render() {
    return (
      <Animated.Image style={this.getStyle()} source={this.props.source} />
    );
  }
}

AnimatableImage.propTypes = {
  source: PropTypes.any.isRequired,
};

export default AnimatableImage;
