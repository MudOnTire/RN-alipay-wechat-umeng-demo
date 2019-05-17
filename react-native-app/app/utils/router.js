import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';

export default {
  chooseLoginOrStay: () => {
    Alert.alert('提示', '您尚未登录，先去登录吗？', [
      {
        text: '再看看',
        style: 'cancel'
      },
      {
        text: '去登录',
        style: 'default',
        onPress: () => {
          Actions.replace('login');
        },
      }
    ], { cancelable: false })
  }
}