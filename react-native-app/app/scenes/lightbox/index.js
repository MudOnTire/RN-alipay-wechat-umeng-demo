import React from 'react';
import {
  Scene,
} from 'react-native-router-flux';
import EditInput from './EditInput';
import ItemPicker from './ItemPicker';
import TimePicker from './TimePicker';

module.exports = [
  <Scene key='picker' component={ItemPicker} title='筛选' />,
  <Scene key='editInput' component={EditInput} />,
  <Scene key='timePicker' component={TimePicker} />
];
