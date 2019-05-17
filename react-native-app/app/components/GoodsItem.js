import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { AppColors } from '@app/theme/';
import FastImage from 'react-native-fast-image'

const styles = StyleSheet.create({
  courseItem: {
    flex: 1,
    padding: 10,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  courseInfo: {
    flex: 4,
    marginLeft: 10
  },
  courseImg: {
    width: 70,
    height: 70,
    borderRadius: 4
  },
  courseTitle: {
    fontSize: 17,
    fontWeight: 'bold'
  },
  courseSubtitle: {
    fontSize: 14,
    marginVertical: 8,
    color: AppColors.textLight
  },
  courseStates: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  coursePrice: {
    color: AppColors.colors.red,
    fontSize: 14
  },
  lessonCount: {
    fontSize: 12,
    color: AppColors.textLight
  },
  watchCount: {
    fontSize: 12,
    color: AppColors.textLight,
    marginLeft: 8
  },
  buyBtn: {
    backgroundColor: AppColors.colors.red,
    paddingHorizontal: 10,
    width: 70,
    height: 36,
    color: '#fff'
  }
});

export default class extends React.Component {
  render() {
    const { item, handleBuy } = this.props;
    return (
      <TouchableOpacity style={styles.courseItem} activeOpacity={0.8} onPress={this.goDetail}>
        <FastImage source={{ uri: item.listImg }} style={styles.courseImg} />
        <View style={styles.courseInfo}>
          <Text style={styles.courseTitle}>{item.title}</Text>
          <Text style={styles.courseSubtitle}>
            {(item.detail && item.detail.length > 20) ? item.detail.slice(0, 20) + '...' : item.detail}
          </Text>
          <View style={styles.courseStates}>
            <Text style={styles.coursePrice}>¥ {item.price}</Text>
          </View>
        </View>
        <Button
          title='购买'
          buttonStyle={{ backgroundColor: AppColors.colors.red }}
          type='outline'
          onPress={() => { handleBuy(item); }}
        />
      </TouchableOpacity>
    )
  }
}