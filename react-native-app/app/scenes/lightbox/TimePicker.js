/**
 * DatePicker
 * created by zhangjianyang at 2018/11/13
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Image,
  View,
  Text,
  Platform,
  Picker
} from 'react-native';
import { observable } from 'mobx';
import { observer } from 'mobx-react/native';
import { SafeAreaView } from 'react-navigation';
import LightBoxBase from './LightBoxBase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  pickerCol: {
    flex: 1
  }
});

const now = new Date();
const years = [];
const months = [];

for (let i = now.getUTCFullYear() - 50; i < now.getUTCFullYear() + 50; i++) {
  years.push(i);
}

for (let i = 1; i <= 12; i++) {
  months.push(i);
}

function daysInYearMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

@observer
export default class DatePicker extends LightBoxBase {

  constructor(props) {
    super(props);
    const now = new Date();
    const { value } = props;
    let selectedTime;
    if (value) selectedTime = new Date(value);
    console.log(value);
    console.log(selectedTime);
    this.state = {
      selectedYear: (selectedTime && selectedTime.getFullYear()) || now.getFullYear(),
      selectedMonth: (selectedTime && selectedTime.getMonth() + 1) || now.getMonth() + 1,
      selectedDate: (selectedTime && selectedTime.getDate()) || now.getDate()
    }
  }

  onYearChange = (value) => {
    this.setState({
      selectedYear: value
    });
  }

  onMonthChange = (value) => {
    this.setState({
      selectedMonth: value
    });
  }

  onDateChange = (value) => {
    this.setState({
      selectedDate: value
    });
  }

  _onConfirm = () => {
    const { selectedYear, selectedMonth, selectedDate } = this.state;
    const time = new Date(selectedYear, selectedMonth - 1, selectedDate);
    const { onConfirm } = this.props;
    if (onConfirm) {
      onConfirm(time);
    }
    this.dismiss();
  }

  renderContent = (props) => {
    const { selectedYear, selectedMonth, selectedDate } = this.state;
    const dayCount = daysInYearMonth(selectedYear, selectedMonth);
    const days = [];
    for (let i = 1; i <= dayCount; i++) {
      days.push(i);
    }
    return (
      <SafeAreaView
        forceInset={{ top: 'never', bottom: 'always' }}
        style={styles.container}
      >
        <Picker
          style={styles.pickerCol}
          onValueChange={this.onYearChange}
          selectedValue={selectedYear}
        >
          {
            years.map(year => (
              <Picker.Item
                key={year}
                label={`${year}年`}
                value={year}
              />
            ))
          }
        </Picker>
        <Picker
          style={styles.pickerCol}
          onValueChange={this.onMonthChange}
          selectedValue={selectedMonth}
        >
          {
            months.map(month => (
              <Picker.Item
                key={month}
                label={`${month}月`}
                value={month}
              />
            ))
          }
        </Picker>
        <Picker
          style={styles.pickerCol}
          onValueChange={this.onDateChange}
          selectedValue={selectedDate}
        >
          {
            days.map(day => (
              <Picker.Item
                key={day}
                label={`${day}日`}
                value={day}
              />
            ))
          }
        </Picker>
      </SafeAreaView>
    );
  }
}
