import React, { Component } from 'react';
import { observer } from 'mobx-react/native';
import { observable } from 'mobx';
import { ActionConst, Actions } from 'react-native-router-flux';
import {
  StyleSheet,
} from 'react-native';
import moment from 'moment';
import UImage from '@app/components/UImage';
import { SafeAreaView } from 'react-navigation';
import { AppColors, AppStyles, AppFonts, AppSizes } from '@app/theme/';
import { Enums } from '@app/constants/';
import Spacer from '@app/components/Spacer';
import ProfileListItem from '@app/components/ProfileListItem';
import UserService, { kLoginUser } from '@app/services/UserService';
import ImagePickerService from '@app/services/ImagePickerService';
import ToastService from '@app/services/MessageToastService';
import FileService from '@app/services/FileService';
import Storage from '@app/services/StorageService';
import DefaultAvatar from '@app/assets/user/default_head.png';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleStyle: {
    color: '#333',
    fontWeight: '400',
    fontSize: 15
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
});

@observer
export default class extends Component {

  selectedGender = (UserService.loginUser && UserService.loginUser.gender) || 'male';

  saveLocalUser = (updatedUser) => {
    Storage.save({
      key: kLoginUser,
      data: updatedUser,
      expires: null,
    });
  }

  chooseAvatar = () => {
    let newAvatarUrl;
    ImagePickerService.showImagePicker('请选择图片')
      .then((imageInfo) => {
        return FileService.upload([imageInfo]);
      })
      .then((res) => {
        const { result } = res;
        if (result.length === 1) {
          newAvatarUrl = result[0].url;
          return UserService.updateUser({
            avatar: newAvatarUrl
          });
        }
      })
      .then((response) => {
        UserService.loginUser.avatar = newAvatarUrl;
        this.saveLocalUser(UserService.loginUser);
        ToastService.showSuccess('修改头像', `头像修改成功`);
      })
      .catch((error) => {
        if (error.message !== 'cancel') {
          ToastService.showError('修改头像', `操作失败：${error}`);
        }
      });
  }

  changeUserAttr = (attrName, attrValue, attrCN, callback, onCancel) => {
    const { loginUser } = UserService;
    if (!loginUser) return;
    if (loginUser[attrName] === attrValue) {
      if (onCancel) onCancel();
      return;
    }
    const updation = {};
    updation[attrName] = attrValue;
    UserService.updateUser(updation)
      .then(response => {
        loginUser[attrName] = attrValue;
        this.saveLocalUser(loginUser);
        ToastService.showSuccess(`修改${attrCN}`, `${attrCN}修改成功`);
        if (callback) callback();
      })
      .catch(err => {
        ToastService.showError(`修改${attrCN}`, `操作失败：${attrCN}`);
      });
  }

  render() {
    const loginUser = UserService.loginUser || {};
    console.log(loginUser);
    const { alias, avatar, gender, birthday, title, introduction } = loginUser;
    return (
      <SafeAreaView forceInset={{ top: 'never', bottom: 'never' }} style={styles.container}>
        <Spacer size={10} />
        <ProfileListItem
          titleStyle={styles.titleStyle}
          title='昵称'
          rightTitle={alias || '未设置'}
          onPress={() => Actions.push('editInput', {
            value: alias,
            limitContentHeight: 200,
            onConfirm: (value, callback) => {
              this.changeUserAttr('alias', value, '昵称', callback);
            }
          })}
        />
        <ProfileListItem
          titleStyle={styles.titleStyle}
          title='头像'
          rightIcon={(
            <UImage
              style={styles.avatar}
              source={{ uri: ImageHelper.convertAvatar(avatar) }}
              defaultSource={DefaultAvatar}
            />
          )}
          onPress={this.chooseAvatar}
        />
        <ProfileListItem
          titleStyle={styles.titleStyle}
          title='性别'
          rightTitle={gender ? Enums.genders[gender] : '未设置'}
          onPress={() => {
            Actions.push('picker', {
              showsToolbar: true,
              animationType: 'slideInUp',
              limitContentHeight: 300,
              items: Enums.genderList,
              selectedIndex: 0,
              onValueChange: (item) => {
                this.selectedGender = item.trueValue;
              },
              onConfirm: () => {
                this.changeUserAttr('gender', this.selectedGender, '性别');
              }
            });
          }}
        />
        <ProfileListItem
          titleStyle={styles.titleStyle}
          title='出生日期'
          rightTitle={birthday ? moment(birthday).format('YYYY-MM-DD') : '未设置'}
          onPress={() => {
            Actions.push('timePicker', {
              showsToolbar: true,
              animationType: 'slideInUp',
              value: birthday,
              limitContentHeight: 250,
              onConfirm: (time) => {
                this.changeUserAttr('birthday', time.getTime(), '出生日期');
              }
            });
          }}
        />
        <Spacer backgroundColor={AppColors.colors.divider} />
        <ProfileListItem
          titleStyle={styles.titleStyle}
          title='个人简介'
          onPress={() => {
            Actions.push('editor', {
              title: '个人简介',
              placeholder: '请输入个人简介，20～1000字',
              initialContent: introduction,
              onConfirm: (value) => {
                this.changeUserAttr('introduction', value, '个人简介', () => {
                  Actions.pop();
                }, Actions.pop);
              }
            });
          }}
        />
      </SafeAreaView>
    );
  }
}
