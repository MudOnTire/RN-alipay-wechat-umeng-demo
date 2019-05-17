import ServiceBase from './ServiceBase';

class GoodsService extends ServiceBase {
  constructor(...props) {
    super(...props);
  }
}

export default new GoodsService('goods');