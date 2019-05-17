/** @format */

import { AppRegistry, YellowBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import LogService from '@app/services/LogService';
import { AppColors, AppFonts, AppSizes, AppStyles } from '@app/theme/';
import ImageHelper from '@app/utils/imageHelper';
import moment from 'moment';
import zhcn from 'moment/locale/zh-cn';

LogService.logLevel = 'debug';

// 忽略部分警告
YellowBox.ignoreWarnings(['Method `jumpToIndex`', 'Require cycle', 'Remote debugger', 'ListView', 'Required', 'RCTBridge']);
// 全局变量
global.LogService = LogService;
global.AppColors = AppColors;
global.AppFonts = AppFonts;
global.AppSizes = AppSizes;
global.AppStyles = AppStyles;
global.ImageHelper = ImageHelper;


AppRegistry.registerComponent(appName, () => App);
