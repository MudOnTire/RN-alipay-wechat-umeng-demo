import ServiceBase from './ServiceBase';
import { request } from '@app/utils';

class OrderService extends ServiceBase {
  constructor(...props) {
    super(...props);
  }

  payWithAlipay = (order) => {
    return request.post(`${this.resource}/pay/app/alipay`, {
      body: order
    });
  }

  payWithWepay = (order) => {
    return request.post(`${this.resource}/pay/app/wepay`, {
      body: order
    });
  }
}

export default new OrderService('orders');