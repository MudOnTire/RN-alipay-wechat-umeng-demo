import { NativeModules } from 'react-native';
import * as WeChat from 'react-native-wechat';

const { Alipay } = NativeModules;
// const wechatAppId = "wx63f0e9b11b8cc14d";
const wechatAppId = "wx6330d9d45fe49b04";

class PayService {

  config = () => {
    WeChat.registerApp(wechatAppId)
      .then(result => {
        console.log(`wechat registered: ${result}`);
      })
      .catch(err => {
        console.log(err);
      });
  }

  alipay = (orderStr) => {
    return Alipay.pay(orderStr);
  }

  wxPay = (orderInfo) => {
    return WeChat.pay(orderInfo);
  }
}

const payService = new PayService();

payService.config();

export default payService;