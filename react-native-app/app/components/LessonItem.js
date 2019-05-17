import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import { AppColors } from '@app/theme/';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
  title: {
    flex: 6,
    fontSize: 13
  },
  playBtn: {
    flex: 1,
    alignItems: 'flex-end'
  }
});

export default class LessonItem extends React.Component {
  render() {
    const { lesson, onPress, isCoursePaid, isPlaying } = this.props;
    if (isCoursePaid) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>{lesson.key}</Text>
          {
            isPlaying ?
              <Text style={{ color: AppColors.colors.red }}>正在播放</Text>
              :
              <TouchableOpacity onPress={onPress} style={styles.playBtn}>
                <Icon name='ios-play-circle' size={20} color={AppColors.colors.grey4} />
              </TouchableOpacity>
          }
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>{lesson.key}</Text>
          {
            isPlaying ?
              <Text style={{ color: AppColors.colors.red }}>正在试看</Text>
              :
              <Text style={{ color: AppColors.colors.grey4 }}>请先购买课程</Text>
          }
        </View>
      )
    }
  }
}

LessonItem.propTypes = {
  lesson: PropTypes.object,
  isPlaying: PropTypes.bool,
  isCoursePaid: PropTypes.bool,
  onPress: PropTypes.func
}

LessonItem.defaultProps = {
  lesson: {},
  isPlaying: false,
  isCoursePaid: false,
  onPress: () => { }
}
