/**
 * App Theme - Sizes
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import { Dimensions, Platform, PixelRatio, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');
const screenHeight = width < height ? height : width;
const screenWidth = width < height ? width : height;

// copied from DrawerNavigator.js
const drawWidth = () => {
  /*
   * Default drawer width is screen width - header height
   * with a max width of 280 on mobile and 320 on tablet
   * https://material.io/guidelines/patterns/navigation-drawer.html
   */
  const smallerAxisSize = Math.min(height, width);
  const isLandscape = width > height;
  const isTablet = smallerAxisSize >= 600;
  const appBarHeight = Platform.OS === 'ios' ? (isLandscape ? 32 : 44) : 56;
  const maxWidth = isTablet ? 320 : 280;

  return Math.min(smallerAxisSize - appBarHeight, maxWidth);
};

export default {
  // Window Dimensions
  screen: {
    height: screenHeight,
    width: screenWidth,

    widthHalf: screenWidth * 0.5,
    widthThird: screenWidth * 0.333,
    widthTwoThirds: screenWidth * 0.666,
    widthQuarter: screenWidth * 0.25,
    widthThreeQuarters: screenWidth * 0.75,
  },
  drawWidth: drawWidth(),
  navbarHeight: Platform.OS === 'ios' ? 44 : 54,
  statusBarHeight: Platform.OS === 'ios' ? 20 : 0,
  tabbarHeight: 51,
  toolbarHeight: 44,

  padding: 20,
  paddingSml: 10,

  borderRadius: 2,

  onePixel: StyleSheet.hairlineWidth,

  largeBtn: {
    borderRadius: 6
  },

  navbarIcon: 30,
  navbarFont: 16
};
