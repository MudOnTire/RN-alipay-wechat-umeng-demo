import React, { Component } from 'react';
import { observer } from 'mobx-react/native';
import { observable } from 'mobx';
import { Actions } from 'react-native-router-flux';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  AppState,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Button from 'react-native-button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoginPageLayout from '@app/components/LoginPageLayout';
import FakeTextInput from '@app/components/FakeTextInput';
import { AppColors, AppStyles, AppSizes } from '@app/theme/';
import UserService from '@app/services/UserService';
import MessageToastService from '@app/services/MessageToastService';
import LoadingService from '@app/services/LoadingService';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginButton: {
    backgroundColor: AppColors.brand.primary,
    height: 44,
    marginTop: 25,
    borderRadius: 4
  },
  loginText: {
    ...AppStyles.h4,
    color: AppColors.textPrimaryLight,
  },
  buttonText: {
    ...AppStyles.h5,
    color: '#FFA018',
    fontSize: 12,
  },
  label: {
    color: AppColors.textSecondary,
    fontWeight: '300',
  },
  input: {
    color: AppColors.textPrimary,
    fontWeight: '300',
    borderWidth: 0,
    borderBottomWidth: AppSizes.onePixel,
    borderBottomColor: AppColors.colors.divider
  },
  rightContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'transparent'
  }
});



@observer
export default class extends Component {

  static propTypes = {};

  static defaultProps = {};

  @observable phone = '';
  @observable code = '';
  @observable password = '';
  @observable countDown = 60;
  @observable verifyCodeBtnEnabled = true;
  @observable passVisible = false;

  @observable mState = AppState.currentState;
  @observable backTime = 0;


  constructor(props) {
    super(props);

  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.mState === 'active' && nextAppState.match(/inactive|background/)) {
      this.backTime = new Date().getTime();
    }
    if (this.mState.match(/inactive|background/) && nextAppState === 'active') {
      const foreTime = new Date().getTime();
      const interval = parseInt((foreTime - this.backTime) / 1000);
      if (Platform.OS === 'ios' && !UserService.isFirstTimeBackToFore_register) {
        // ios 第二次进来就不用管了
      } else {
        if (interval < this.countDown) {
          this.countDown = this.countDown - interval;
        } else {
          this.countDown = 0;
        }
      }
      UserService.isFirstTimeBackToFore_register = false;
    }
    this.mState = nextAppState;
  };

  _onCancelRegister = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    Actions.pop();
  };

  // 注册
  _onSubmit = () => {
    if (!this.phone) {
      this.refs.phoneInput.focus();
      return;
    }
    // if (!this.code) {
    //   this.refs.codeInput.focus();
    //   return;
    // }
    if (!this.password) {
      this.refs.passInput.focus();
      return;
    }

    const { phone, code, password } = this;
    LoadingService.showLoading();
    const userVo = {
      username: phone,
      code,
      password
    };
    UserService.register(userVo)
      .then((result) => {
        LoadingService.hideLoading(() => {
          MessageToastService.showSuccess('注册成功');
          Actions.replace('tabs');
        });
      })
      .catch((error) => {
        LoadingService.hideLoading(() => {
          MessageToastService.showError('注册失败', `错误: ${error.message}`);
        });
      });

  };


  _renderCodeBtn = () => {
    return (
      <View style={{
        flexDirection: 'row',
        height: 48,
      }}
      >
        <View style={{
          height: 25,
          borderLeftWidth: 1,
          borderLeftColor: '#E1E1E1',
          marginHorizontal: 15
        }}
        />
        <Button
          onPress={this._requestVerifyCode}
          disabled={!this.verifyCodeBtnEnabled}
          style={{ fontWeight: '400', fontSize: 14, color: AppColors.textLight }}
          styleDisabled={[styles.label, { color: AppColors.textSecondary, backgroundColor: 'transparent' }]}
        >
          {this.verifyCodeBtnEnabled ? '发送验证码' : `${this.countDown}s`}
        </Button>
      </View>
    );
  };

  _requestVerifyCode = () => {
    const { phone } = this;
    if (!phone) {
      MessageToastService.showWarn('提示', '请输入手机号！');
      this.refs.phoneInput.focus();
      return;
    }
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      MessageToastService.showWarn('提示', '请输入正确的手机号！');
      return;
    }
    UserService.sendVerifyCode({ phone })
      .then(this._startCountDown)
      .catch((err) => MessageToastService.showError('获取验证码失败', err.message));
  };

  _startCountDown = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.verifyCodeBtnEnabled = false;
    this.countDown = 60;
    const countDown = () => {
      this.countDown -= 1;
      LogService.info('this.countDown', this.countDown);
      if (this.countDown === 0) {
        this.verifyCodeBtnEnabled = true;
        clearTimeout(this.timeout);
      } else {
        this.timeout = setTimeout(countDown, 1000);
      }
    };
    this.timeout = setTimeout(countDown, 1000);
  };

  getImageParam = () => {
    if (this.passVisible) {
      return {
        width: 20,
        height: 15,
        source: require('@app/assets/open_icon.png'),
      };
    }
    return {
      width: 22,
      height: 20,
      source: require('@app/assets/close_icon.png'),
    };
  };

  render() {
    const { width, height, source } = this.getImageParam();
    return (
      <SafeAreaView forceInset={{ vertical: 'always' }} style={[AppStyles.container, styles.container]}>
        <LoginPageLayout title='用户注册' onClose={this._onCancelRegister}>
          <KeyboardAwareScrollView enableOnAndroid extraScrollHeight={44} showsVerticalScrollIndicator={false}>
            <View>
              <FakeTextInput
                label={'请输入手机号'}
                ref='phoneInput'
                borderColor='transparent'
                labelStyle={styles.label}
                inputStyle={styles.input}
                value={this.phone}
                keyboardType='phone-pad'
                onChange={(event) => (this.phone = event.nativeEvent.text)}
                onSubmitEditing={() => this.refs.codeInput.focus()}
                returnKeyType='next'
              />
              {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FakeTextInput
                  label={'请输入收到的验证码'}
                  ref='codeInput'
                  style={{ width: 220, height: 48 }}
                  borderColor='transparent'
                  labelStyle={styles.label}
                  inputStyle={styles.input}
                  value={this.code}
                  keyboardType='number-pad'
                  maxLength={6}
                  onChange={(event) => (this.code = event.nativeEvent.text)}
                  onSubmitEditing={() => this.refs.passInput.focus()}
                  returnKeyType='next'
                />
                {
                  this._renderCodeBtn()
                }
              </View> */}
              <View>
                <FakeTextInput
                  label={'请输入密码'}
                  secureTextEntry={!this.passVisible}
                  ref='passInput'
                  borderColor='transparent'
                  labelStyle={styles.label}
                  inputStyle={styles.input}
                  value={this.password}
                  onChange={(event) => (this.password = event.nativeEvent.text)}
                  onSubmitEditing={this._onSubmit}
                  returnKeyType='done'
                />
                <View style={[styles.rightContainer]}>
                  <TouchableOpacity
                    style={[AppStyles.container, { backgroundColor: 'transparent', paddingTop: 20, paddingRight: 16 }]}
                    onPress={() => this.passVisible = !this.passVisible}
                    activeOpacity={0.7}
                  >
                    <Image style={{ height, width }} source={source} />
                  </TouchableOpacity>
                </View>
              </View>

              <Button onPress={this._onSubmit}>
                <View style={[AppStyles.containerCentered, styles.loginButton]}>
                  <Text style={styles.loginText}>注册</Text>
                </View>
              </Button>
            </View>
          </KeyboardAwareScrollView>
          {/* <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
            <Text style={{ fontSize: 10 }}>
              注册完成即表示您同意协议
              <Text
                suppressHighlighting={false}
                style={{ color: 'rgb(244,92,0)' }}
                onPress={() => Actions.push('termsAndPrivatePolicy', { contentType: 'terms' })}>
                《服务协议》
              </Text>
              及
              <Text
                suppressHighlighting={false}
                style={{ color: 'rgb(0,150,255)' }}
                onPress={() => Actions.push('termsAndPrivatePolicy', { contentType: 'privatePolicy' })}
              >
                《隐私政策》
              </Text>
            </Text>
          </View> */}
        </LoginPageLayout>
      </SafeAreaView>
    );
  }
}