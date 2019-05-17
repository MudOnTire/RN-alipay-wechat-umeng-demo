import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import moment from 'moment';
import { AppColors, AppFonts, AppSizes, AppStyles } from '@app/theme/';
import { AppServer } from '@app/constants';
import defaultImg from '@app/assets/info/news_image_default.png';
import defaultAvatar from '@app/assets/user/default_head.png';
import { Actions } from 'react-native-router-flux';
import FastImage from 'react-native-fast-image'

export default class extends React.Component {

  _onPress = () => {
    const { item } = this.props;
    const postUrl = `${AppServer.SHARE_URLS.POST}/${item._id}?preview=true`;
    console.log(postUrl);
    Actions.push('shareWebView', {
      title: item.title,
      shareTitle: item.title,
      source: { uri: postUrl },
      contentType: 'post',
      itemId: item._id
    });
  };

  render() {
    const { item, separators } = this.props;
    const { fromUser } = item;
    console.log(item);
    return (
      <TouchableOpacity
        style={{ paddingHorizontal: 15 }}
        activeOpacity={0.97}
        onShowUnderlay={separators.highlight}
        onHideUnderlay={separators.unhighlight}
        onPress={this._onPress}
      >
        <View
          style={[AppStyles.row, { backgroundColor: 'white', paddingTop: 20 }]}>
          <View style={{ justifyContent: 'flex-start', alignItems: 'center', marginRight: 6 }}>
            <FastImage
              source={(fromUser && fromUser.avatar) ? { uri: ImageHelper.convertAvatar(fromUser.avatar) } : defaultAvatar}
              style={{ width: 44, height: 44, borderRadius: 22 }}
              resizeMod='contain'
            />
            <Text style={{ fontSize: 12, color: '#999', marginTop: 6 }}>
              {fromUser && (fromUser.alias || '匿名用户')}
            </Text>
          </View>
          <View style={{
            flex: 1,
            borderBottomWidth: AppSizes.onePixel,
            borderBottomColor: AppColors.border,
            height: 70,
            paddingBottom: 10,
            marginLeft: 6,
            paddingLeft: 6,
            paddingRight: 6
          }}>
            <Text style={[AppStyles.h5, { flex: 1, fontSize: 15 }]} numberOfLines={1}
              ellipsizeMode='tail'>
              {item.title}
            </Text>
            <View style={AppStyles.row}>
              <Text style={[AppStyles.h5, {
                flex: 1,
                fontSize: 12,
                color: '#999999',
                fontWeight: '300'
              }]}
                numberOfLines={1} ellipsizeMode='tail'>
                {item.watchCount}人阅读
              </Text>
              <Text
                format='YYYY-MM-DD'
                style={[AppStyles.h5, {
                  alignSelf: 'flex-end',
                  fontSize: 12,
                  color: '#999999',
                  fontWeight: '300'
                }]}
              >
                {
                  moment().valueOf() - moment(item.createdTime).valueOf() > 24 * 60 * 60 * 1000 ?
                    moment(item.createdTime).format('YYYY-MM-DD')
                    :
                    moment(item.createdTime).fromNow()
                }
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}