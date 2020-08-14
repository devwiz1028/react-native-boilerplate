import React from 'react';
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';

import {FullScreenLoadingIndicator} from '../global/components';
import {Animation} from '../global/constants';

export const UPDATE_ANIMATION = 'UPDATE_ANIMATION';
export const RESET_ANIMATION = 'RESET_ANIMATION';
export const SHOW_OVERLAY = 'SHOW_OVERLAY';
export const WILL_HIDE_OVERLAY = 'WILL_HIDE_OVERLAY';

export function getNewStateWithAnimatable(state, data) {
  const animatables = {};
  Object.assign(animatables, state.animatables, data);
  Object.keys(animatables).forEach((componentName) => {
    animatables[componentName] = {
      ...state.animatables[componentName],
      ...data[componentName],
    };
  });
  return {
    ...state,
    animatables,
  };
}

export function updateAnimation(screenName, data) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_ANIMATION,
      screenName,
      data,
    });
  };
}

export function resetAnimation(screenName) {
  return (dispatch) => {
    dispatch({
      type: RESET_ANIMATION,
      screenName,
    });
  };
}

export function showOverlay(renderFunc, delay) {
  return (dispatch) => {
    if (!renderFunc && delay) {
      const delayTime = delay === true ? Animation.normalDuration : delay;
      dispatch({
        type: WILL_HIDE_OVERLAY,
      });
      setTimeout(() => {
        dispatch({
          type: SHOW_OVERLAY,
          renderFunc,
        });
      }, delayTime);
    } else {
      dispatch({
        type: SHOW_OVERLAY,
        renderFunc,
      });
    }
  };
}

export function showLoading(show = true) {
  return showOverlay(show && (() => <FullScreenLoadingIndicator />), true);
}

// export function withApp(mapStateToProps, mapDispatchToProps) {
//   const mapStateToPropsWithApp = state => ({
//     ...(mapStateToProps ? mapStateToProps(state) : {}),
//   });
//   const mapDispatchToPropsWithApp = dispatch => bindActionCreators({
//     ...(mapDispatchToProps || {}),
//     updateAnimatables,
//     resetAnimatables,
//     showOverlay,
//     showLoading,
//   }, dispatch);
//   return connect(mapStateToPropsWithApp, mapDispatchToPropsWithApp);
// }
