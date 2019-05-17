import React from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet, StatusBar } from 'react-native';
import { observer } from 'mobx-react/native';
import { observable, toJS } from 'mobx';
import { AppColors, AppFonts, AppSizes, AppStyles } from '@app/theme/';
import GoodsService from '@app/services/models/GoodsService';
import MessageToastService from '@app/services/MessageToastService';
import GoodsItem from '@app/components/GoodsItem';
import ListItemSeperator from '@app/components/ListItemSeperator';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  }
});

@observer
export default class extends React.Component {

  componentDidMount() {
    this.getPaidCourses();
  }

  getPaidCourses = () => {
    GoodsService.getPaidCourses()
      .catch(err => MessageToastService.showError('获取我的课程错误', err.message));
  }

  renderItem = ({ item }) => <GoodsItem item={item} />

  render() {
    const { paidCourses, isGetPaidCourses } = CourseService;
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: 'white' }]}>
        <StatusBar barStyle='dark-content' />
        <FlatList
          data={paidCourses}
          showsVerticalScrollIndicator={false}
          renderItem={this.renderItem}
          ItemSeparatorComponent={ListItemSeperator}
          keyExtractor={(item) => item._id}
          refreshing={isGetPaidCourses}
          onRefresh={this.getPaidCourses}
        />
      </SafeAreaView>
    )
  }
}