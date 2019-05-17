import { observable } from 'mobx';
import ServiceBase from './ServiceBase';
import { request } from '@app/utils';
import { stringify } from 'qs';
import UserService from '../UserService';

class FavoriteService extends ServiceBase {

  constructor(...props) {
    super(...props);
  }

  isItemFavorite = async (itemId, type) => {
    const params = { type };
    if (type === 'course') {
      params.course = itemId;
    } else if (type === 'news') {
      params.news = itemId;
    } else if (type === 'post') {
      params.post = itemId;
    } else {
      return false;
    }
    params.fromUser = UserService.loginUser._id;
    try {
      const res = await request.get(`${this.resource}?${stringify(params)}`);
      if (res.code === 0) {
        const { result } = res;
        if (result.list.length > 0) {
          return true;
        } else {
          return false;
        }
      }
    } catch (err) {
      throw err;
    }
  }

  getMine = async (refresh = true, params = {}) => {
    if (this.requesting) {
      return;
    }
    this.requesting = true;
    if (refresh) {
      this.currentPage = 1;
    } else {
      this.currentPage += 1;
    }
    if (!params.pageSize) {
      params.pageSize = 10;
    }
    params.pageNum = this.currentPage;
    this.refreshing = refresh;
    try {
      const res = await request.get(`${this.resource}/mine/all?${stringify(params)}`);
      if (res.code === 0) {
        const { result } = res;
        if (refresh) {
          this.list.splice(0, this.list.length);
        }
        this.list.push(...result.list);
        this.hasMore = this.list.length < result.pagination.total;
      }
    } catch (err) {
      throw err;
    } finally {
      this.requesting = false;
      this.refreshing = false;
    }
  }
}

export default new FavoriteService('favorites');