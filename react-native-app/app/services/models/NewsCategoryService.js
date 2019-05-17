import { observable } from 'mobx';
import ServiceBase from './ServiceBase';
import { request } from '@app/utils';

class NewsCategoryService extends ServiceBase {

  constructor(...props) {
    super(...props);
  }
}

export default new NewsCategoryService('news-categories');