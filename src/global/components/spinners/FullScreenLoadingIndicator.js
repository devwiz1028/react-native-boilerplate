import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import MaterialIndicator from './MaterialIndicator';
import {AnimatableView} from '../animations';
import {Colors, Metrics, Animation} from '../../constants';

class FullScreenLoadingIndicator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      containerData: this.getContainerData(false),
    };
  }

  componentDidMount() {
    this.setState({
      containerData: this.getContainerData(true, true),
    });
  }

  componentWillReceiveProps(nextProps) {
    const {willHideOverlay} = this.props;
    if (!willHideOverlay && nextProps.willHideOverlay) {
      this.setState({
        containerData: this.getContainerData(false, true),
      });
    }
  }

  getContainerData(show, animate = false) {
    const background = {value: show ? Colors.overlay : Colors.transparent};
    if (animate) {
      background.animate = {duration: Animation.normalDuration};
    }

    return {
      // add 2 to fix white line issue on iphone x
      size: {value: [Metrics.screenWidth + 2, Metrics.screenHeight]},
      center: {value: [Metrics.screenWidth / 2, Metrics.screenHeight / 2]},
      background,
    };
  }

  render() {
    const {willHideOverlay} = this.props;
    const {containerData} = this.state;

    const containerStyle = {
      justifyContent: 'center',
      alignItems: 'center',
    };

    return (
      <AnimatableView data={containerData} style={containerStyle}>
        {!willHideOverlay && (
          <MaterialIndicator color={Colors.white} size={76} />
        )}
      </AnimatableView>
    );
  }
}

FullScreenLoadingIndicator.propTypes = {
  willHideOverlay: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  willHideOverlay: state.app.willHideOverlay,
});

const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FullScreenLoadingIndicator);
