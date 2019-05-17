/**
 * index.js
 * created by 熊玮 at 2018/10/26
 */
import React from 'react';
import {
  Stack,
  Scene,
} from 'react-native-router-flux';
import Login from './Login';
import LoginByCode from './LoginByCode';
import Register from './Register';
import FindPassword from './FindPassword';

const sceneStyle = {
  backgroundColor: '#FFFFFF',
};

module.exports = (
  <Stack key='login' sceneStyle={sceneStyle} hideNavBar panHandlers={null} headerLayoutPreset="center" path="login/:data" titleStyle={{ alignSelf: 'center' }}>
    <Scene key='loginMain' component={Login} title='登录' />
    <Scene key='loginByCode' component={LoginByCode} title='验证码登录' />
    <Scene key='register' component={Register} title='注册' />
    <Scene key='findPassword' component={FindPassword} title='找回密码' />
  </Stack>
);
