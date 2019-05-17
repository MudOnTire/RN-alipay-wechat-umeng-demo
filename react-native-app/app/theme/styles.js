/**
 * App Styles
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */

import {
  StyleSheet,
  Platform,
} from 'react-native';
import Colors from './colors';
import Fonts from './fonts';
import Sizes from './sizes';

export default {
  appContainer: {
    backgroundColor: '#000',
  },

  // Default
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.background,
  },
  containerCentered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  windowSize: {
    height: Sizes.screen.height,
    width: Sizes.screen.width,
  },

  // Aligning items
  leftAligned: {
    alignItems: 'flex-start',
  },
  centerAligned: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightAligned: {
    alignItems: 'flex-end',
  },

  // Text Styles
  baseText: {
    fontFamily: Fonts.base.family,
    fontSize: Fonts.base.size,
    // lineHeight: Fonts.base.lineHeight,
    color: Colors.textPrimary,
    fontWeight: '300',
  },
  p: {
    fontFamily: Fonts.base.family,
    fontSize: Fonts.base.size,
    // lineHeight: Fonts.base.lineHeight,
    color: Colors.textPrimary,
    fontWeight: '300',
  },
  h1: {
    fontFamily: Fonts.h1.family,
    fontSize: Fonts.h1.size,
    // lineHeight: Fonts.h1.lineHeight,
    color: Colors.headingPrimary,
    fontWeight: '800',
    margin: 0,
    left: 0,
    right: 0,
  },
  h2: {
    fontFamily: Fonts.h2.family,
    fontSize: Fonts.h2.size,
    // lineHeight: Fonts.h2.lineHeight,
    color: Colors.headingPrimary,
    fontWeight: '800',
    margin: 0,
    left: 0,
    right: 0,
  },
  h3: {
    fontFamily: Fonts.h3.family,
    fontSize: Fonts.h3.size,
    // lineHeight: Fonts.h3.lineHeight,
    color: Colors.headingPrimary,
    fontWeight: '500',
    margin: 0,
    left: 0,
    right: 0,
  },
  h4: {
    fontFamily: Fonts.h4.family,
    fontSize: Fonts.h4.size,
    // lineHeight: Fonts.h4.lineHeight,
    color: Colors.headingPrimary,
    fontWeight: '800',
    margin: 0,
    left: 0,
    right: 0,
  },
  h5: {
    fontFamily: Fonts.h5.family,
    fontSize: Fonts.h5.size,
    // lineHeight: Fonts.h5.lineHeight,
    color: Colors.headingPrimary,
    fontWeight: '800',
    margin: 0,
    left: 0,
    right: 0,
  },
  strong: {
    fontWeight: '900',
  },
  link: {
    textDecorationLine: 'underline',
    color: Colors.brand.primary,
  },
  subtext: {
    fontFamily: Fonts.base.family,
    fontSize: Fonts.base.size * 0.8,
    // lineHeight: parseInt(Fonts.base.lineHeight * 0.8, 10),
    color: Colors.textSecondary,
    fontWeight: '500',
  },

  // Helper Text Styles
  textCenterAligned: {
    textAlign: 'center',
  },
  textRightAligned: {
    textAlign: 'right',
  },

  // Give me padding
  padding: {
    paddingVertical: Sizes.padding,
    paddingHorizontal: Sizes.padding,
  },
  paddingHorizontal: {
    paddingHorizontal: Sizes.padding,
  },
  paddingLeft: {
    paddingLeft: Sizes.padding,
  },
  paddingRight: {
    paddingRight: Sizes.padding,
  },
  paddingVertical: {
    paddingVertical: Sizes.padding,
  },
  paddingTop: {
    paddingTop: Sizes.padding,
  },
  paddingBottom: {
    paddingBottom: Sizes.padding,
  },
  paddingSml: {
    paddingVertical: Sizes.paddingSml,
    paddingHorizontal: Sizes.paddingSml,
  },
  paddingHorizontalSml: {
    paddingHorizontal: Sizes.paddingSml,
  },
  paddingLeftSml: {
    paddingLeft: Sizes.paddingSml,
  },
  paddingRightSml: {
    paddingRight: Sizes.paddingSml,
  },
  paddingVerticalSml: {
    paddingVertical: Sizes.paddingSml,
  },
  paddingTopSml: {
    paddingTop: Sizes.paddingSml,
  },
  paddingBottomSml: {
    paddingBottom: Sizes.paddingSml,
  },

  // General HTML-like Elements
  hr: {
    left: 0,
    right: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    height: 1,
    backgroundColor: 'transparent',
    marginTop: Sizes.padding,
    marginBottom: Sizes.padding,
  },

  // Grid
  row: {
    left: 0,
    right: 0,
    flexDirection: 'row',
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  flex3: {
    flex: 3,
  },
  flex4: {
    flex: 4,
  },
  flex5: {
    flex: 5,
  },
  flex6: {
    flex: 6,
  },

  // Navbar
  navbar: {
    backgroundColor: Colors.navibar.background,
    tintColor: Colors.navibar.tintColor,
    borderBottomWidth: 0,
    height: Sizes.navbarHeight,
  },
  navbarTransparent: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
  navbarTitle: {
    color: Colors.textPrimary,
    fontWeight: 'bold',
    fontFamily: Fonts.base.family,
    fontSize: Fonts.base.size * 1.25,
    alignSelf: 'center'
  },
  navbarButton: {
    tintColor: Colors.textPrimary,
  },

  // TabBar
  tabbar: {
    backgroundColor: Colors.tabbar.background,
    borderTopColor: Colors.border,
    borderTopWidth: Sizes.onePixel,
  },

  // divider
  divider: {
    left: 0,
    right: 0,
    height: Sizes.onePixel,
    backgroundColor: Colors.border,
  },
  dividerVertical: {
    width: Sizes.onePixel,
    alignSelf: 'stretch',
    backgroundColor: Colors.border,
  },

  // list
  listContainer: {
    marginTop: 0,
    borderTopWidth: 0,
    borderColor: Colors.border,
  },
  listItemContainer: {
    borderTopColor: Colors.border,
    borderTopWidth: Sizes.onePixel,
    borderBottomColor: Colors.border,
    borderBottomWidth: Sizes.onePixel,
    minHeight: 44,
  },

  raised: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
      android: {
        backgroundColor: '#fff',
        elevation: 2,
      },
    }),
  },
};
