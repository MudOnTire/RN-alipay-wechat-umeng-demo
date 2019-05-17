import React from 'react';
import {
  Scene,
} from 'react-native-router-flux';
import Home from './Home';
import PayWay from './PayWay';

module.exports = [
  <Scene key='home' component={Home} title='课堂' />,
  <Scene key='payway' component={PayWay} title='确认订单' />
];
