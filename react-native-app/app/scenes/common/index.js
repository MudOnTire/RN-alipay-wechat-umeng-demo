import React from 'react';
import {
  Scene,
} from 'react-native-router-flux';
import ShareWebView from './ShareWebView';
import Editor from './Editor';

module.exports = [
  <Scene key='shareWebView' component={ShareWebView} headerTransparent />,
  <Scene key='editor' component={Editor} title='编辑' />,
];