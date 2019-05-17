import React from 'react';
import { Scene, Tabs, Actions, ActionConst } from 'react-native-router-flux';
import TabIcon from '@app/components/TabIcon';
import Home from './home/Home';
import Info from './info/Info';
import Me from './me/Me'
import UserService from '@app/services/UserService';

// 留一定的延时，否责可能有bug
const loginFailureHandler = () => {
  setTimeout(Actions.login, 800);
};

module.exports = (
  <Tabs
    key='tabs'
    lazy
    hideNavBar
    backToInitial
    type={ActionConst.RESET}
    gestureEnabled={false}
    swipeEnabled={false}
    animationEnabled
    tabBarPosition='bottom'
    showLabel={false}
    activeBackgroundColor={AppColors.colors.white}
    inactiveBackgroundColor={AppColors.colors.white}
    tabBarStyle={AppStyles.tabbar}
  >
    <Scene
      key='home'
      hideNavBar={false}
      title='商品'
      icon={TabIcon}
      activeIcon='chalkboard-teacher'
      // activeIcon='chalkboard'
      component={Home}
    // onEnter={UserService.checkLogin}
    // failure={loginFailureHandler}
    />
    <Scene
      key='info'
      hideNavBar={false}
      title='资讯'
      icon={TabIcon}
      activeIcon='poll-h'
      component={Info}
    />
    <Scene
      key='me'
      hideNavBar={false}
      title='我的'
      icon={TabIcon}
      activeIcon='user-graduate'
      component={Me}
      // onEnter={UserService.checkLogin}
      // failure={loginFailureHandler}
    />
  </Tabs>
);