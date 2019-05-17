import React from 'react';
import { View } from 'react-native';
import { AppColors } from '@app/theme/';

export default class extends React.Component {
  render() {
    return (
      <View style={{
        backgroundColor: AppColors.colors.divider,
        height: 1,
        marginLeft: 10,
        marginTop: -1
      }} />
    )
  }
}