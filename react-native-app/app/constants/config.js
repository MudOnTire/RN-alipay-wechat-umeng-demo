/**
 * Global App Config
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
/* global __DEV__ */
import { AppColors, AppStyles, AppSizes } from '@app/theme/';

export default {
  // App
  appName: '语众不同',
  appVersion: '1.0.0',

  // Build Configuration - eg. Debug or Release?
  DEV: __DEV__,

  // Navbar Props
  navbarProps: {
    hideNavBar: false,
    headerTitleStyle: AppStyles.navbarTitle,
    headerLayoutPreset: 'center',
    titleStyle: AppStyles.navbarTitle,
    backTitle: null,
    navigationBarStyle: AppStyles.navbar,
    navBarButtonColor: AppColors.navibar.tintColor,
    leftButtonIconStyle: AppStyles.navbarButton,
    rightButtonIconStyle: AppStyles.navbarButton,
    sceneStyle: {
      backgroundColor: AppColors.background,
      paddingTop: AppSizes.navbarHeight,
    },
  },

  // others
  FORMATS: {
    DATETIME: 'YYYY-MM-DD HH:mm:ss',
    DATETIME_SHORT: 'MM-DD HH:mm',
    DATE: 'YYYY-MM-DD',
    DATETIME_CN: 'YYYY年MM月DD日',
    TIME: 'HH:mm:ss',
    TIME_SHORT: 'HH:mm',
  },

  DEFAULTS: {
    avatar: 'http://lc-3Cv4Lgro.cn-n1.lcfile.com/4ae62d3827ad6390f024.png'
  }
};
