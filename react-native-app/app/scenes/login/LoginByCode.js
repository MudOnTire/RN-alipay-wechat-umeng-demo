import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react/native';
import { observable } from 'mobx';
import { Actions } from 'react-native-router-flux';
import {
  StyleSheet,
  View,
  Text,
  AppState,
  Platform,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Button from 'react-native-button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
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
    color: '#666666',
    fontSize: 12,
  },
  label: {
    color: AppColors.textSecondary,
    fontWeight: '300'
  },
  input: {
    color: AppColors.textPrimary,
    fontWeight: '300',
    borderWidth: 0,
    borderBottomWidth: AppSizes.onePixel,
    borderBottomColor: AppColors.colors.divider
  }
});

@observer
export default class extends Component {

  static propTypes = {
    onLoginResult: PropTypes.func,
  };

  static defaultProps = {
    onLoginResult: () => {
    },
  };

  @observable phone = '';
  @observable code = '';
  @observable verifyCodeBtnEnabled = true;
  @observable countDown = 60;

  @observable mState = AppState.currentState;
  @observable backTime = 0;

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.mState === 'active' && nextAppState.match(/inactive|background/)) {
      this.backTime = new Date().getTime();
    }
    if (this.mState.match(/inactive|background/) && nextAppState === 'active') {
      const foreTime = new Date().getTime();
      const interval = parseInt((foreTime - this.backTime) / 1000);
      if (Platform.OS === 'ios' && !UserService.isFirstTimeBackToFore_login) {
        // ios 第二次进来就不用管了
      } else {
        if (interval < this.countDown) {
          this.countDown = this.countDown - interval;
        } else {
          this.countDown = 0;
        }
      }
      UserService.isFirstTimeBackToFore_login = false;
    }
    this.mState = nextAppState;
  };

  // 登录
  _onLogin = () => {
    const { onLoginResult } = this.props;
    const { code, phone } = this;
    if (!phone) {
      this.refs.phoneInput.focus();
      return;
    }
    if (!code) {
      this.refs.codeInput.focus();
      return;
    }
    LoadingService.showLoading('正在登录...');
    UserService.loginWithCode({ username: phone, code })
      .then(() => {
        LoadingService.hideLoading();
        Actions.replace('tabs');
        onLoginResult && onLoginResult(true);
      })
      .catch((err) => {
        LoadingService.hideLoading();
        MessageToastService.showError('用户登录', err.message);
      });
  };

  _onLoginByPassword = () => {
    Actions.replace('loginMain');
  };

  _onRegister = () => {
    Actions.push('register');
  };

  _renderCaretDown = () => {
    return (
      <View style={[AppStyles.container, { backgroundColor: 'transparent', paddingTop: 20, paddingRight: 16 }]}>
        <AntDesignIcon name='caretdown' color={AppColors.textPrimary} size={14} />
      </View>
    );
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
    UserService.sendVerifyCode({ phone }).then(this._startCountDown)
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

  render() {
    return (
      <SafeAreaView forceInset={{ always: 'always' }} style={[AppStyles.container, styles.container]}>
        <StatusBar barStyle='dark-content' />
        <KeyboardAwareScrollView>
          <LoginPageLayout hideClose title='验证码登录'>
            <FakeTextInput
              label={'请输入手机号码'}
              ref='phoneInput'
              maxLength={11}
              borderColor='transparent'
              labelStyle={styles.label}
              inputStyle={styles.input}
              value={this.phone}
              keyboardType='phone-pad'
              onChange={(event) => (this.phone = event.nativeEvent.text)}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
              />
              {
                this._renderCodeBtn()
              }
            </View>
            <Button onPress={this._onLogin}>
              <View style={[AppStyles.containerCentered, styles.loginButton]}>
                <Text style={styles.loginText}>登录</Text>
              </View>
            </Button>
            <Button onPress={() => { Actions.replace('tabs') }}>
              <View style={[AppStyles.containerCentered, styles.loginButton, { marginTop: 10 }]}>
                <Text style={styles.loginText}>先逛逛</Text>
              </View>
            </Button>
            <View style={[AppStyles.row, { marginTop: 26 }]}>
              <Button onPress={this._onLoginByPassword} containerStyle={[AppStyles.leftAligned, { flex: 1 }]}
                style={styles.buttonText}>
                密码登录
              </Button>
              <Button onPress={this._onRegister} containerStyle={[AppStyles.rightAligned, { flex: 1 }]}
                style={styles.buttonText}>
                去注册
              </Button>
            </View>
          </LoginPageLayout>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}
