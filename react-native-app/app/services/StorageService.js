/**
 * Created by xiongwei on 2017/2/8.
 */

import {
  AsyncStorage
} from 'react-native';
import Storage from 'react-native-storage';

const storage = new Storage({
  storageBackend: AsyncStorage,
  // 数据过期时间，默认7天（1000 * 3600 * 24 毫秒），设为null则永不过期
  defaultExpires: 1000 * 3600 * 24 * 7,
});

export default storage;