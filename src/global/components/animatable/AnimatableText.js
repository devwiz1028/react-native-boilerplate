import React from 'react';
import PropTypes from 'prop-types';
import {Animated} from 'react-native';

import AnimatableView from './AnimatableView';

class AnimatableText extends AnimatableView {
  render() {
    return (
      <Animated.Text style={this.getStyle()}>
        {this.props.children}
      </Animated.Text>
    );
  }
}

AnimatableText.propTypes = {
  children: PropTypes.any.isRequired,
};

export default AnimatableText;
