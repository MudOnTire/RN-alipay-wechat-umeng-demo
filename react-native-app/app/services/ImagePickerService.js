import * as Picker from 'react-native-image-picker';
import {Platform} from 'react-native';
import Mime from 'mime';

/**
 * 图片选择服务
 */
export default class ImagePickerService {

  /**
   * 选择图片
   * @param title
   * @returns {Promise}
   * @private
   */
  static showImagePicker(title = '图片上传') {
    return new Promise((resolve, reject) => {
      const options = {
        title,
        mediaType: 'photo',
        takePhotoButtonTitle: '拍照',
        chooseFromLibraryButtonTitle: '相册',
        cancelButtonTitle: '取消',
        noData: true,
        storageOptions: {
          skipBackup: true,
          path: 'images',
          cameraRoll: false,
        },
      };
      Picker.showImagePicker(options, (response) => {
        if (response.didCancel) {
          reject(new Error('cancel'));
        } else if (response.error) {
          reject(new Error(response.error));
        } else {
          const imageInfo = {};
          if (Platform.OS === 'ios') {
            imageInfo.uri = response.uri;
            imageInfo.type = Mime.getType(response.uri);
          } else {
            imageInfo.uri = response.path.startsWith('file://') ? response.path : `file://${response.path}`;
            imageInfo.type = Mime.getType(response.path);
          }
          imageInfo.name = `${Date.now()}.${Mime.getExtension(imageInfo.type)}`;
          resolve(imageInfo);
        }
      });
    });
  }
}
