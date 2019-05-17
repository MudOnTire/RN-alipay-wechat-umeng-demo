/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, BackHandler } from 'react-native';
import {
  Scene,
  Router,
  Actions,
  ActionConst,
  Reducer,
  Overlay,
  Tabs,
  Modal,
  Stack,
  Lightbox
} from 'react-native-router-flux';
import { StackViewStyleInterpolator } from 'react-navigation-stack';
import { observer } from 'mobx-react/native';
import { AppColors, AppStyles } from '@app/theme';
import { AppConfig } from '@app/constants';
import Loading from '@app/components/Loading';
import LoadingService from "@app/services/LoadingService";
import ActionService from "@app/services/ActionService";
import MessageBar from '@app/components/MessageBar';
import Splash from '@app/scenes/Splash';

const reducerCreate = (params) => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    // console.log(state);
    // console.log(action);
    return defaultReducer(state, action);
  };
};

const getSceneStyle = () => ({
  backgroundColor: AppColors.background,
  shadowOpacity: 1,
  shadowRadius: 3,
});

const stateHandler = (prevState, newState, action) => {
  LogService.trace('onStateChange:', prevState, newState, action);
  if (action.type === 'Navigation/COMPLETE_TRANSITION') {
    ActionService.currentScene = Actions.currentScene;
  }
};

const prefix = Platform.OS === 'android' ? 'SpecialSpeakers://SpecialSpeakers/' : 'SpecialSpeakers://';

const transitionConfig = () => ({
  screenInterpolator: StackViewStyleInterpolator.forFadeFromBottomAndroid,
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Router
        wrapBy={observer}
        createReducer={reducerCreate}
        getSceneStyle={getSceneStyle}
        onStateChange={stateHandler}
        uriPrefix={prefix}
        backAndroidHandler={() => {
          if (LoadingService.show) {
            return true;
          }
          if (ActionService.currentScene.match(/_home|_info|_transaction|_me|loginMain|loginByCode/)) {
            BackHandler.exitApp();
            return false;
          }
          Actions.pop();
          return true;
        }}
      >
        <Overlay key='root'>
          <Modal key='modal' hideNavBar transitionConfig={transitionConfig}>
            <Lightbox key='lightbox'>
              <Stack key='main' {...AppConfig.navbarProps}>
                <Scene key='splash' initial component={Splash} type={ActionConst.RESET} hideNavBar />
                {require('@app/scenes/common')}
                {require('@app/scenes/login')}
                {require('@app/scenes/Tabs')}
                {require('@app/scenes/home')}
                {require('@app/scenes/info')}
                {require('@app/scenes/me')}
              </Stack>
              {require('@app/scenes/lightbox')}
            </Lightbox>
          </Modal>
          <Scene key='loading' component={Loading} />
          <Scene key='messageBar' component={MessageBar} />
        </Overlay>
      </Router>
    );
  }
}
