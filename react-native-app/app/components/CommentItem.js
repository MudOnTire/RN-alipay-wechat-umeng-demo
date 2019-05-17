import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AppColors } from '@app/theme/';
import Config from '@app/constants/config';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import FastImage from 'react-native-fast-image'

const styles = StyleSheet.create({
  commentItem: {
    flex: 1,
    padding: 10,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15
  }
});

export default class extends React.Component {
  render() {
    const { comment } = this.props;
    console.log(comment);
    const { fromUser } = comment;
    return (
      <View style={styles.commentItem}>
        <FastImage
          style={styles.avatar}
          source={{ uri: (fromUser && fromUser.avatar) || Config.DEFAULTS.avatar }}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>{(fromUser && fromUser.alias) || '匿名用户'}</Text>
            <Text style={{ color: '#888', fontSize: 12 }}>
              {moment(comment.updatedTime).format('YYYY-MM-DD HH:mm:ss')}
            </Text>
          </View>
          <Text style={{ color: '#333' }}>{comment.content}</Text>
        </View>
      </View>
    )
  }
}