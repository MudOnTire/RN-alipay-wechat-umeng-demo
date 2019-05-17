import React, { Component } from 'react';
import { observer } from 'mobx-react/native';
import { Actions } from 'react-native-router-flux';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView
} from 'react-native';
import FastImage from 'react-native-fast-image'
import UImage from '@app/components/UImage';
import { SafeAreaView } from 'react-navigation';
import { ListItem } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppColors, AppSizes } from '@app/theme/';
import Spacer from '@app/components/Spacer';
import UserService from '@app/services/UserService';
import DefaultAvatar from '@app/assets/user/default_head.png';
import routerUitls from '@app/utils/router';
import Button from 'react-native-button';
import LoadingService from '@app/services/LoadingService';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  topBg: {
    width: AppSizes.screen.width
  },
  bgHeader: {
    width: AppSizes.screen.width,
    height: AppSizes.screen.width * 0.42,
    paddingTop: 10,
    backgroundColor: '#fff'
  },
  topContent: {
    flexDirection: 'row',
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center'
  },
  topAvatar: {
    width: 78,
    height: 78,
    marginLeft: 34,
    borderRadius: 39,
    borderColor: '#fff',
    borderWidth: 3
  },
  topName: {
    flex: 3,
    fontSize: 28,
    color: '#fff',
    marginLeft: 12
  },
  listItemContainer: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 0.5,
    borderBottomColor: AppColors.colors.divider
  },
  listItemWrapper: {
    paddingVertical: 4
  },
  logoutBtn: {
    alignSelf: 'center',
    marginTop: 50,
    width: AppSizes.screen.width,
    backgroundColor: '#fff',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftIconStyle: {
    width: 50,
    paddingRight: 8,
    textAlign: 'center'
  },
});

@observer
export default class extends Component {

  _doLogout = () => {
    Alert.alert('用户登出', '确定要登出系统吗？', [
      {
        text: '取消',
        style: 'cancel'
      },
      {
        text: '登出',
        style: 'destructive',
        onPress: () => {
          LoadingService.showLoading('正在退出...');
          UserService.logout().then(() => {
            LoadingService.hideLoading();
            Actions.replace('login');
          }).catch(e => {
            LoadingService.hideLoading();
            LogService.error(e);
          })
        },
      }
    ], { cancelable: false })
  };

  render() {
    const { loginUser } = UserService;
    const avatar = loginUser && loginUser.avatar;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle='dark-content' />
        <TouchableOpacity
          style={styles.topBg}
          onPress={() => {
            if (loginUser) {
              Actions.profile();
            } else {
              Actions.replace('login');
            }
          }}
          activeOpacity={0.7}
        >
          <FastImage
            source={require("@app/assets/user/me_bg.png")}
            style={styles.bgHeader} resizeMode='contain'
          />
          <View style={styles.topContent}>
            <UImage
              style={styles.topAvatar}
              source={{ uri: avatar && ImageHelper.convertAvatar(avatar) }}
              defaultSource={DefaultAvatar}
            />
            {
              loginUser ?
                <Text style={styles.topName}>
                  {loginUser && (loginUser.alias || loginUser.username)}
                </Text>
                :
                <Button onPress={() => { Actions.replace('login') }} style={{ marginLeft: 20, color: '#fff', fontSize: 20 }}>
                  您尚未登录，去登录
                </Button>
            }
          </View>
        </TouchableOpacity>
        <Spacer backgroundColor={AppColors.colors.divider} />
        <ScrollView>
          <ListItem
            title="个人资料"
            containerStyle={styles.listItemContainer}
            wrapperStyle={styles.listItemWrapper}
            leftIcon={
              <Ionicons name='md-person' color={AppColors.colors.grey1} size={24} style={styles.leftIconStyle} />
            }
            onPress={() => {
              if (loginUser) {
                Actions.profile();
              } else {
                routerUitls.chooseLoginOrStay();
              }
            }}
          />
          {
            loginUser &&
            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={this._doLogout}
              activeOpacity={0.5}
            >
              <Text style={{ fontSize: 17, color: '#333' }}>退出登录</Text>
            </TouchableOpacity>
          }
        </ScrollView>
      </SafeAreaView>
    );
  }
}
