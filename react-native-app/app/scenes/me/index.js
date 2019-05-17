import React from 'react';
import {
  Scene,
} from 'react-native-router-flux';
import Me from './Me';
import Profile from './Profile';
import PaidCourses from './PaidCourses';
import AboutUs from './AboutUs';

module.exports = [
  <Scene key='me' component={Me} title='我的' />,
  <Scene key='profile' component={Profile} title='个人资料' />,
  <Scene key='paidCourses' component={PaidCourses} title='我的课程' />,
  <Scene key='aboutUs' component={AboutUs} title='关于我们' />
];
