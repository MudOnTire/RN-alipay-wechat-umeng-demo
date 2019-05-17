/**
 * 平台
 */
const SharePlatform = {
  SINA: 1,
  WECHAT: 2,
  WECHATMOMENT: 3,
  QQ: 4,
  QQZONE: 5,
  ALIPAY: 6
}
export { SharePlatform };

/**
* 原生桥接
*/
import {
  NativeModules
} from 'react-native';

export default NativeModules.UMShareModule;