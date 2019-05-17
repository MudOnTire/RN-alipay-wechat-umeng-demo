import { observable } from 'mobx';
import ServiceBase from './ServiceBase';
import { request } from '@app/utils';

class CommentService extends ServiceBase {

  constructor(...props) {
    super(...props);
  }
}

export default new CommentService('comments');