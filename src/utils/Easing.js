import {Easing} from 'react-native';

export default {
  default: Easing.bezier(0.25, 0.1, 0.25, 1),
  out: Easing.out(Easing.ease),
  both: Easing.inOut(Easing.ease),
  custom: Easing.bezier,
};
