import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {Animated, Easing} from 'react-native';

const hasLoopSupport = true;

export default class Indicator extends PureComponent {
  static defaultProps = {
    animationEasing: Easing.linear,
    animationDuration: 1200,
    animationDelay: 0,

    animating: true,
    interaction: true,

    renderComponent: () => null,
    count: 1,
  };

  static propTypes = {
    animationEasing: PropTypes.func,
    animationDuration: PropTypes.number,
    animationDelay: PropTypes.number,

    animating: PropTypes.bool,
    interaction: PropTypes.bool,

    renderComponent: PropTypes.func,
    count: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.renderComponent = this.renderComponent.bind(this);
    this.startAnimation = this.startAnimation.bind(this);
    this.stopAnimation = this.stopAnimation.bind(this);

    this.state = {
      progress: new Animated.Value(0),
    };

    this.mounted = false;
  }

  componentDidMount() {
    const {animating} = this.props;

    this.mounted = true;

    if (animating) {
      this.startAnimation();
    }
  }

  componentWillReceiveProps(props) {
    const {animating} = this.props;

    if (animating !== props.animating) {
      if (animating) {
        this.stopAnimation();
      } else {
        this.startAnimation();
      }
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  startAnimation({finished} = {}) {
    const {progress} = this.state;
    const {
      interaction,
      animationEasing,
      animationDuration,
      animationDelay,
    } = this.props;

    if (!this.mounted || finished === false) {
      return;
    }

    const animation = Animated.timing(progress, {
      duration: animationDuration,
      delay: animationDelay,
      easing: animationEasing,
      useNativeDriver: true,
      isInteraction: interaction,
      toValue: 1,
    });

    if (hasLoopSupport) {
      Animated.loop(animation).start();
    } else {
      progress.setValue(0);
      animation.start(this.startAnimation);
    }

    this.setState({animation});
  }

  stopAnimation() {
    const {animation} = this.state;

    if (animation == null) {
      return;
    }

    animation.stop();

    this.setState({animation: null});
  }

  renderComponent(item, index) {
    const {progress} = this.state;
    const {renderComponent, count} = this.props;

    if (typeof renderComponent === 'function') {
      return renderComponent({index, count, progress});
    }

    return null;
  }

  render() {
    const {count, ...otherProps} = this.props;

    return (
      <Animated.View {...otherProps}>
        {Array.from(new Array(count), this.renderComponent)}
      </Animated.View>
    );
  }
}
