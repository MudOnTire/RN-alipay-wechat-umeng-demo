import Mime from 'mime';
import { AppServer } from '@app/constants';
import { observable, toJS } from 'mobx';
import { request, stringify } from '@app/utils';

class FileService {

  @observable guideImgs = [];

  upload = (files) => {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });
    return request.post(`upload`, {
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  };

  // getGuideImgs = async () => {
  //   const apiPath = '/store2-service-colligate/v1/guides/';
  //   try {
  //     const result = await request.get(apiPath);
  //     this.guideImgs = [...result.list];
  //   } catch (error) {
  //     // throw error;
  //   } finally {
  //     this.guideImgs = [
  //       'http://lc-KJW9tCaf.cn-n1.lcfile.com/fdfa17cbd2491cba71eb.png',
  //       'http://lc-KJW9tCaf.cn-n1.lcfile.com/23596fdfa1cb270ecf73.png',
  //       'http://lc-KJW9tCaf.cn-n1.lcfile.com/2b13f35a37dbc9eb23f5.jpg',
  //       'http://lc-KJW9tCaf.cn-n1.lcfile.com/f63da69a0f34e2c893ff.jpeg',
  //       'http://lc-KJW9tCaf.cn-n1.lcfile.com/c78fa0f3e3a38c2d2cf6.png'
  //     ]
  //   }
  // }

}

export default new FileService()
