import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import moment from 'moment';
import { AppColors, AppFonts, AppSizes, AppStyles } from '@app/theme/';
import { AppServer } from '@app/constants';
import defaultImg from '@app/assets/info/news_image_default.png';
import { Actions } from 'react-native-router-flux';
import FastImage from 'react-native-fast-image'

export default class extends React.Component {
  _onPress = () => {
    const { item } = this.props;
    const newsUrl = `${AppServer.SHARE_URLS.NEWS}/${item._id}?preview=true`;
    console.log(newsUrl);
    const baidu = 'http://www.baidu.com';
    Actions.push('shareWebView', {
      title: item.title,
      shareTitle: item.title,
      source: { uri: newsUrl },
      contentType: 'news',
      itemId: item._id
    });
  };

  render() {
    const { item, separators } = this.props;
    console.log(item);
    return (
      <TouchableOpacity
        style={{ marginHorizontal: 15 }}
        activeOpacity={0.97}
        onShowUnderlay={separators.highlight}
        onHideUnderlay={separators.unhighlight}
        onPress={this._onPress}
      >
        <View
          style={[AppStyles.row, { backgroundColor: 'white', paddingTop: 20, paddingLeft: 10 }]}>
          <FastImage
            source={item.listImg ? { uri: item.listImg } : defaultImg}
            style={{ width: 60, height: 60, borderRadius: 4 }}
            resizeMod='contain'
          />
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
                {item.watchCount || 0}人阅读
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