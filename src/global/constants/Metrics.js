import {Platform, Dimensions} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const isAndroid = Platform.OS !== 'ios';
const statusBarHeight = getStatusBarHeight(false);
const screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
if (isAndroid) {
  screenHeight += statusBarHeight;
}
// Use these ratios in case the design is based on 375x812 size
const widthRatio = screenWidth / 375;
const heightRatio = screenHeight / 812;
const iPhoneX = !isAndroid && screenHeight >= 812;
const contentWidth = screenWidth;
const contentHeight = screenHeight;
const tabBarHeight = iPhoneX ? 83 : 60;

export default {
  // margins
  rem1: 4,
  rem2: 8,
  rem3: 12,
  rem4: 16,
  rem5: 20,
  rem6: 24,
  rem7: 28,
  rem8: 32,
  rem9: 36,
  rem10: 40,

  // frame sizes
  statusBarHeight,
  screenWidth,
  screenHeight,
  widthRatio,
  heightRatio,
  contentWidth,
  contentHeight,
  tabBarHeight,
  iPhoneX,
  keyboardHeight: 216,
  screenSpacing: iPhoneX ? {top: 0, bottom: 12} : {top: 0, bottom: 0},
  navbarHeight: statusBarHeight + 44,
  controlWidth: screenWidth - 32,
  controlHeight: 52,

  // other
  isAndroid,
};
