import { observable } from 'mobx';
import { stringify } from 'qs';
import { request } from '@app/utils';

export default class ServiceBase {

  @observable currentPage = 1;
  @observable refreshing = false;
  @observable hasMore = false;
  @observable list = [];
  requesting = false;

  constructor(resource) {
    this.resource = resource;
  }

  reset = () => {
    this.requesting = false;
    this.hasMore = false;
    this.refreshing = false;
    this.currentPage = 1;
    this.list.splice(0, this.list.length);
  }

  queryItems = async (refresh = true, params = {}) => {
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
      const res = await request.get(`${this.resource}?${stringify(params)}`);
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

  saveItem = async (params) => {
    if (params._id) {
      return request.put(`${this.resource}/${params._id}`, { body: params });
    } else {
      return request.post(this.resource, { body: params });
    }
  }

  getItemDetail = async (params) => {
    return request.get(`${this.resource}/${params._id}`);
  }

  deleteItem = async (params) => {
    return request.delete(`${this.resource}/${params._id}`);
  }

  deleteMany = async (params = {}) => {
    return request.delete(`${this.resource}?${stringify(params)}`);
  }
}