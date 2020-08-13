import Colors from './Colors';
import Metrics from './Metrics';

export default {
  flex1: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  containerNoNav: {
    flex: 1,
    paddingTop: Metrics.statusBarHeight,
  },
  background: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  row: {
    flexDirection: 'row',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  absoluteFull: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  absoluteFullWidth: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
  circle: (size) => ({
    width: size,
    height: size,
    borderRadius: size / 2,
  }),
  shadow: (offsetX, offsetY, size, opacity, color = 'black') => ({
    shadowColor: color,
    shadowOpacity: opacity,
    shadowOffset: {width: offsetX, height: offsetY},
    shadowRadius: size,
    elevation: Math.ceil(size / 6),
  }),
};
