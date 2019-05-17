
import { observable, toJS } from 'mobx';
import StorageService from './StorageService';
import { request } from '@app/utils';
import { stringify } from 'qs';
import { Actions } from 'react-native-router-flux';
import UMShare from '@app/utils/umshare';

export const kLoginUser = 'com.specialSpeakers.user';

class UserService {

  @observable loginUser;

  @observable isFirstTimeBackToFore_findpass = true;
  @observable isFirstTimeBackToFore_login = true;
  @observable isFirstTimeBackToFore_register = true;

  reset = () => {
    // reset数据
    this.loginUser = undefined;
  }

  checkLogin = async () => {

    // return true;

    if (this.loginUser) {
      return true;
    }
    try {
      this.loginUser = await StorageService.load({
        key: kLoginUser,
        autoSync: false,
        syncInBackground: false,
      });
      LogService.info('cachedUser', this.loginUser);
      return !!this.loginUser;
    } catch (e) {
      // NONE
    }
    return false;
  }


  checkIfLoginOrJump = async () => {
    const isLogin = await this.checkLogin();
    if (!isLogin) Actions.login();
  }


  /**
   * 发送验证码
   */
  sendVerifyCode = (payload) => {
    return request.get(`accounts/sendVerifyCode?${stringify(payload)}`)
  }

  /**
   * 登录成功处理
   */
  handleLoginSuccess = async (res) => {
    const { result } = res;
    this.loginUser = result;
    try {
      await StorageService.save({
        key: kLoginUser,
        data: result
      });
    } catch (e) {
      LogService.error(e);
    }
  }

  /**
   * 注册
   */
  register = async (payload) => {
    const res = await request.post('accounts/register', { body: payload });
    await this.handleLoginSuccess(res);
    return true;
  }

  /**
   * 登录
   */
  login = async (payload) => {
    const res = await request.post('accounts/login', { body: payload });
    await this.handleLoginSuccess(res);
    return true;
  }

  /**
   * 验证码登录
   */
  loginWithCode = async (payload) => {
    const res = await request.post('accounts/loginWithCode', { body: payload })
    await this.handleLoginSuccess(res);
    return true;
  }

  thirdPartyAuth = (platformId) => {
    return new Promise((resolve, reject) => {
      UMShare.authLogin(platformId, (code, userInfo, errMsg) => {
        if (code == 200 && userInfo) {
          resolve(userInfo)
        } else {
          const err = new Error(errMsg);
          reject(err);
        }
        /* Wechat */
        // accessToken: "20_ELbpiJB3lXao5Hg4mZpVvkGfPDP-YKCqf5RBH0kf-xZ5vSpFSbzG98_J0tJWBFJHO8t9G3RqPsN2e6cUk5v2piXrn9iulFozAAE3-DRRMrc"
        // city: "南京"
        // country: "中国"
        // expiration: null
        // gender: "男"
        // iconurl: "https://thirdwx.qlogo.cn/mmopen/vi_32/wXn7azzoRcJnnFlN73wadkickVBrWX7cmW7HpbNHr5djjGGdzQjic8FmbxrfJFpUd9PO77CfOZlTMdg3tkLHbqdQ/132"
        // name: "EyeOfTiger"
        // openid: "oqi4I1DVUwnx0lJX75DRtILTpRGg"
        // province: "江苏"
        // refreshToken: "20_oX-d-uIZwRg6wc7hKtFD6ImnqJNqkA4ennxKcXUfYgk5RAsBkru9KnJjMp8TG2lm7AihsCgzYy3Uppb58wNFhhZ0dhqvaA9FQL4fZRI-t94"
        // uid: "o_eBL1pA6APkvlczMV_0auZgSrKM"
        // unionid: "o_eBL1pA6APkvlczMV_0auZgSrKM"

        /* QQ */
        // accessToken: "5EDFEE5E6EADF20884837D3F8DC72B86"
        // city: "南京"
        // expiration: null
        // gender: "男"
        // iconurl: "https://thirdqq.qlogo.cn/g?b=oidb&k=ugl5ydsaICyZPf5DQ6JxUw&s=100"
        // name: "WindInHair"
        // openid: "2FB70AA45D834FAE92A5E47CCC53D350"
        // province: "江苏"
        // uid: "2FB70AA45D834FAE92A5E47CCC53D350"
      });
    });
  }

  loginWithThirdPartyAuth = async (platformId) => {
    const userInfo = await this.thirdPartyAuth(platformId);
    let platform;
    if (platformId === 2) {
      platform = 'wechat';
    } else if (platformId === 4) {
      platform = 'qq';
    }
    const { name, iconurl, openid } = userInfo;
    const res = await request.post('accounts/thirdPartyAuth', {
      body: {
        platform,
        username: name,
        avatar: iconurl,
        openId: openid
      }
    });
    console.log(res);
    await this.handleLoginSuccess(res);
    return true;
  }

  /**
   * 登出
   */
  logout = () => {
    this.reset();
    StorageService.remove({ key: kLoginUser });
    return request.post('accounts/logout');
  }

  /**
   * 修改用户资料
   */
  updateUser = (payload) => {
    return request.put('accounts/update', { body: payload });
  }

  /**
   * 忘记密码，重制密码
   */
  resetPassword = (payload) => {
    return request.post('accounts/current/password', { body: payload });
  }
}

export default new UserService();
