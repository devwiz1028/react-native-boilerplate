import {SHOW_OVERLAY, WILL_HIDE_OVERLAY} from '../../actions';

const initialState = {
  overlayRenderFunc: false,
  willHideOverlay: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_OVERLAY:
      return {
        ...state,
        overlayRenderFunc: action.renderFunc,
        willHideOverlay: false,
      };

    case WILL_HIDE_OVERLAY:
      return {
        ...state,
        willHideOverlay: true,
      };

    default:
      return state;
  }
};
