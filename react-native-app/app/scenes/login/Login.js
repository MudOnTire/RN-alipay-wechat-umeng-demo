import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react/native';
import { observable } from 'mobx';
import { Actions } from 'react-native-router-flux';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Button from 'react-native-button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import LoginPageLayout from '@app/components/LoginPageLayout';
import FakeTextInput from '@app/components/FakeTextInput';
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
    color: AppColors.brand.primary,
    fontSize: 13,
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
  sperator: {
    marginVertical: 12,
    height: 1,
    width: 120,
    backgroundColor: AppColors.colors.divider
  },
  thirdPartyAuth: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 18
  },
  thirdPartyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
    backgroundColor: '#f2f3f4'
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

  @observable ProvinceAndOrganizations = [];
  @observable currentProvince;
  @observable currentOrganization;
  @observable phone = '';
  @observable password = '';

  _getProvinceAndOrganizations = async () => {
    try {
      const result = await UserService.getProvinceAndOrganizations();
      this.ProvinceAndOrganizations.splice(0, this.ProvinceAndOrganizations.length);
      this.ProvinceAndOrganizations.push(...result);
      this.currentProvince = 0;
      this.currentOrganization = 0;
    } catch (err) {
      // none
      LogService.error('获取高校信息出错', err);
    }
  };

  // 登录
  _onLogin = () => {
    const { onLoginResult } = this.props;
    const { phone, password } = this;
    if (!phone) {
      this.refs.phoneInput.focus();
      return;
    }
    if (!password) {
      this.refs.passwordInput.focus();
      return;
    }
    LoadingService.showLoading('正在登录...');
    UserService.login({ username: phone, password })
      .then((res) => {
        LoadingService.hideLoading();
        Actions.replace('tabs');
        onLoginResult && onLoginResult(true);
      })
      .catch((err) => {
        LoadingService.hideLoading();
        MessageToastService.showError('用户登录', err.message);
      });
  };

  _onLoginByCode = () => {
    Actions.replace('loginByCode');
  };

  _onLoginByThirdPartyAuth = (platformId) => {
    UserService.loginWithThirdPartyAuth(platformId)
      .then((res) => {
        LoadingService.hideLoading();
        Actions.replace('tabs');
        const { onLoginResult } = this.props;
        onLoginResult && onLoginResult(true);
      })
      .catch((err) => {
        LoadingService.hideLoading();
        MessageToastService.showError('用户登录', err.message);
      });
  }

  _onRegister = () => {
    Actions.push('register', { current: Actions.currentScene });
  };

  _onFindPassword = () => {
    Actions.push('findPassword');
  };

  _renderCaretDown = () => {
    return (
      <View style={[AppStyles.container, { backgroundColor: 'transparent', paddingTop: 20, paddingRight: 16 }]}>
        <AntDesignIcon name='caretdown' color={AppColors.textPrimary} size={14} />
      </View>
    );
  };

  _selectProvince = () => {
    if (this.ProvinceAndOrganizations.length === 0) {
      MessageToastService.showInfo('提示', '正在获取省份与高校数据，请稍候！');
      this._getProvinceAndOrganizations().done();
      return;
    }
    const items = this.ProvinceAndOrganizations.map(({ id, name }) => ({ label: name, value: id }));
    Actions.push('picker', {
      showsToolbar: true,
      animationType: 'slideInUp',
      limitContentHeight: 300,
      items,
      selectedIndex: this.currentProvince,
      onValueChange: (item, index) => {
        this.currentProvince = index;
        this.currentOrganization = 0;
      }
    });
  };

  _selectOrganization = () => {
    if (typeof this.currentProvince === 'undefined') {
      MessageToastService.showInfo('提示', '请先选择省份！');
      this._selectProvince();
      return;
    }
    const items = this.ProvinceAndOrganizations[this.currentProvince].children.map(({ id, name }) => ({ label: name, value: id }));
    Actions.push('picker', {
      showsToolbar: true,
      animationType: 'slideInUp',
      limitContentHeight: 300,
      items,
      selectedIndex: this.currentOrganization,
      onValueChange: (item, index) => {
        this.currentOrganization = index;
      }
    });
  };

  _onFindPassword = () => {
    Actions.push('findPassword');
  };

  render() {
    return (
      <SafeAreaView forceInset={{ vertical: 'always' }} style={[AppStyles.container, styles.container]}>
        <StatusBar barStyle='dark-content' />
        <KeyboardAwareScrollView>
          <LoginPageLayout title='密码登录' hideClose onClose={this._onCancelLogin}>
            {
              false && (
                <FakeTextInput
                  onPress={this._selectProvince}
                  label={typeof this.currentProvince !== 'undefined' ? this.ProvinceAndOrganizations[this.currentProvince].name : '请选择省份'}
                  borderColor='transparent'
                  labelStyle={styles.label}
                  inputStyle={styles.input}
                  editable={false}
                  renderRightComponent={this._renderCaretDown}
                />
              )
            }
            {
              false && (
                <FakeTextInput
                  onPress={this._selectOrganization}
                  label={typeof this.currentOrganization !== 'undefined' ? this.ProvinceAndOrganizations[this.currentProvince].children[this.currentOrganization].name : '请选择高校'}
                  borderColor='transparent'
                  labelStyle={styles.label}
                  inputStyle={styles.input}
                  editable={false}
                  renderRightComponent={this._renderCaretDown}
                />
              )
            }

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
            <FakeTextInput
              label={'请输入密码'}
              secureTextEntry
              ref='passwordInput'
              borderColor='transparent'
              labelStyle={styles.label}
              inputStyle={styles.input}
              value={this.password}
              onChange={(event) => (this.password = event.nativeEvent.text)}
            />
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
            <View style={{ marginTop: 26, justifyContent: 'center', flex: 1, alignItems: 'center' }}>
              <Button onPress={this._onRegister}
                style={[styles.buttonText, { color: '#666666' }]}>
                去注册
              </Button>
              <View style={styles.sperator} />
              <Text style={{ color: '#999', fontSize: 12 }}>第三方登录</Text>
              <View style={styles.thirdPartyAuth}>
                <TouchableOpacity style={styles.thirdPartyBtn} onPress={() => { this._onLoginByThirdPartyAuth(2) }}>
                  <Image
                    resizeMode='contain'
                    style={styles.thirdPartyIcon}
                    source={require("@app/assets/umeng/umeng_socialize_wechat.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.thirdPartyBtn} onPress={() => { this._onLoginByThirdPartyAuth(4) }}>
                  <Image
                    resizeMode='contain'
                    style={styles.thirdPartyIcon}
                    source={require("@app/assets/umeng/umeng_socialize_qq.png")}
                  />
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.thirdPartyBtn} onPress={() => { this._onLoginByThirdPartyAuth(6) }}>
                  <Image
                    resizeMode='contain'
                    style={styles.thirdPartyIcon}
                    source={require("@app/assets/umeng/umeng_socialize_alipay.png")}
                  />
                </TouchableOpacity> */}
              </View>
            </View>
          </LoginPageLayout>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}
