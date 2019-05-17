import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar, FlatList } from 'react-native';
import { observer } from 'mobx-react/native';
import { observable, toJS } from 'mobx';
import { AppColors, AppFonts, AppSizes, AppStyles } from '@app/theme/';
import GoodsService from '@app/services/models/GoodsService';
import OrderService from '@app/services/models/OrderService';
import UserService from '@app/services/UserService';
import LoadingService from '@app/services/LoadingService';
import MessageToastService from '@app/services/MessageToastService';
import { Actions } from 'react-native-router-flux';
import GoodsItem from '@app/components/GoodsItem';
import ListItemSeperator from '@app/components/ListItemSeperator';
import routerUitls from '@app/utils/router';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  sectionHeader: {
    flex: 1,
    height: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff'
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerDeco: {
    width: 4,
    height: 22,
    backgroundColor: AppColors.theme,
    marginRight: 10
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  sectionRightText: {
    fontSize: 14,
    color: AppColors.colors.blueGrey
  }
});

@observer
export default class extends React.Component {
  @observable isLogin = false;

  componentDidMount() {
    this.getGoods();
    this.checkLogin();
  }

  getGoods = (refresh = true) => {
    GoodsService.queryItems(refresh)
      .catch(err => MessageToastService.showError('获取商品错误', err.message));
  }

  checkLogin = () => {
    UserService.checkLogin()
      .then((isLogin) => {
        this.isLogin = isLogin;
      })
      .catch(err => {
        this.isLogin = false;
      });
  }

  handleBuy = (goods) => {
    if (!this.isLogin) {
      routerUitls.chooseLoginOrStay();
      return;
    }
    LoadingService.showLoading('正在创建订单...');
    OrderService.saveItem({
      goods: goods._id
    }).then(res => {
      if (res && res.code === 0) {
        LoadingService.hideLoading();
        Actions.payway({
          order: { ...res.result, goods }
        });
      } else {
        LoadingService.hideLoading();
        MessageToastService.showError(`创建订单失败`);
      }
    }).catch(err => {
      LoadingService.hideLoading();
      MessageToastService.showError(`创建订单失败：${err.message}`);
    });
  }

  renderItem = ({ item }) => <GoodsItem item={item} handleBuy={this.handleBuy} />

  render() {
    const { list, refreshing, hasMore } = GoodsService;
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: 'white' }]}>
        <StatusBar barStyle='dark-content' />
        <FlatList
          data={list}
          showsVerticalScrollIndicator={false}
          renderItem={this.renderItem}
          ItemSeparatorComponent={ListItemSeperator}
          keyExtractor={(item) => item._id}
          refreshing={refreshing}
          onRefresh={this.getGoods}
          onEndReachedThreshold={0.2}
          onEndReached={() => {
            if (hasMore) {
              this.getGoods(false);
            }
          }}
        />
      </SafeAreaView >
    )
  }
}