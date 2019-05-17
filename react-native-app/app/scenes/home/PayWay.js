import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity, Image, RefreshControl, Platform } from 'react-native';
import { observer } from 'mobx-react/native';
import { observable, toJS } from 'mobx';
import MessageToastService from '@app/services/MessageToastService';
import OrderService from '@app/services/models/OrderService';
import PayService from '@app/services/PayService';
import { Actions } from 'react-native-router-flux';
import PayWayItem from '@app/components/PayWayItem';
import Spacer from '@app/components/Spacer';
import { DeviceEventEmitter } from 'react-native'
import { Enums } from '@app/constants/';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
    justifyContent: 'space-between'
  },
  courseItem: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  courseInfo: {
    flex: 4,
    marginLeft: 10,
    height: 80,
    justifyContent: 'space-between',
  },
  courseImg: {
    width: 80,
    height: 80,
    borderRadius: 4
  },
  courseTitle: {
    fontSize: 17,
    fontWeight: 'bold'
  },
  courseStates: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  coursePrice: {
    color: AppColors.colors.red,
    fontSize: 18
  },
  lessonCount: {
    fontSize: 16,
    color: AppColors.textLight
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee'
  },
  payBtn: {
    backgroundColor: AppColors.colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 36,
    borderRadius: 4
  },
  warning: {
    padding: 20,
  },
  warningText: {
    color: '#888',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 4
  }
});


@observer
export default class extends React.Component {

  @observable selectedPayway = 'alipay';

  simplifyOrder = (order) => {
    return {
      ...order,
      goods: {
        _id: order.goods._id,
        title: order.goods.title,
      }
    }
  }

  // 支付宝支付
  payWithAlipay = (simpleOrder) => {
    OrderService.payWithAlipay(simpleOrder)
      .then(res => {
        // 生成支付宝订单
        if (res.result && res.result.code === 0) {
          return PayService.alipay(res.result.data);
        } else {
          const error = new Error();
          error.message = `创建支付宝订单失败：${res.result.message}`;
          throw error;
        }
      })
      .then(payRes => {
        // 检验支付结果
        if (payRes) {
          console.log(payRes);
          const { memo, result, resultStatus } = payRes;
          if (resultStatus === "9000") {
            MessageToastService.showSuccess('支付成功！');
            Actions.pop();
            DeviceEventEmitter.emit(Enums.events.COURSE_PAID, {});
          } else {
            const error = new Error();
            error.message = `支付失败：${memo}`;
            throw error;
          }
        }
      })
      .catch(err => {
        console.log(err);
        MessageToastService.showError(`支付失败：${err.message}`);
      });
  }

  // 微信支付
  payWithWepay = (simpleOrder) => {
    OrderService.payWithWepay(simpleOrder)
      .then(res => {
        // 生成微信订单
        if (res && res.code === 0) {
          // appid: "wx6330d9d45fe49b04"
          // noncestr: "JSxtgCSSwXiyoD9Q"
          // package: "Sign=WXPay"
          // partnerid: "1488057972"
          // prepayid: "wx052059287614325e41abf99a0049511276"
          // sign: "07FC1F3334796219F5E415662FC5A362"
          // timestamp: "1554469168"
          const { appid, noncestr, partnerid, prepayid, sign, timestamp } = res.result;
          return PayService.wxPay({
            partnerId: partnerid,
            prepayId: prepayid,
            nonceStr: noncestr,
            timeStamp: timestamp,
            package: res.result.package,
            sign
          });
        } else {
          const error = new Error();
          error.message = `创建微信订单失败：${res.result.message}`;
          throw error;
        }
      })
      .then(payRes => {
        const { errCode } = payRes;
        if (errCode === 0) {
          MessageToastService.showSuccess('支付成功！');
          Actions.pop();
          DeviceEventEmitter.emit(Enums.events.COURSE_PAID, {});
        }
      })
      .catch(err => {
        let msg = '支付失败';
        if (err.code === -1) {
          msg = '支付失败：未知错误';
        } else if (err.code === -2) {
          msg = '支付失败：用户取消';
        }
        MessageToastService.showError(msg);
      });
  }

  pay = () => {
    const { order } = this.props;
    const simpleOrder = this.simplifyOrder(order);
    if (this.selectedPayway === 'alipay') {
      this.payWithAlipay(simpleOrder);
    } else if (this.selectedPayway === 'wepay') {
      this.payWithWepay(simpleOrder);
    }
  }

  render() {
    const { order: { goods } } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle='dark-content' />
        <View>
          {
            goods &&
            <View style={styles.courseItem}>
              <Image source={{ uri: goods.listImg }} style={styles.courseImg} />
              <View style={styles.courseInfo}>
                <Text style={styles.courseTitle}>{goods.title}</Text>
                <View style={styles.courseStates}>
                  <Text style={styles.coursePrice}>¥ {goods.price}</Text>
                </View>
              </View>
            </View>
          }
          <Spacer size={1} height={10} />
          <PayWayItem
            isSelected={this.selectedPayway === 'alipay'}
            onPress={() => { this.selectedPayway = 'alipay' }}
          />
          <PayWayItem
            isSelected={this.selectedPayway === 'wepay'}
            title='微信支付'
            logo={require('../../assets/wepay/logo.png')}
            onPress={() => { this.selectedPayway = 'wepay' }}
          />
          <View style={styles.warning}>
            <Text style={styles.warningText}>商品说明</Text>
            <Text style={styles.warningText}>你将购买的商品为虚拟内容服务，购买后不支持退订、转让、退换、请斟酌确认</Text>
            <Text style={styles.warningText}>购买后，打开***app，在“我的订单”中查看</Text>
          </View>
        </View>
        <View style={styles.bottomBar}>
          <Text style={{ fontSize: 17 }}>需支付 ¥{goods.price}</Text>
          <TouchableOpacity style={styles.payBtn} onPress={this.pay}>
            <Text style={{ color: '#fff' }}>支付</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView >
    )
  }
}