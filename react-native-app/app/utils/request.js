import { Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { AppServer } from '@app/constants';
import MessageToastService from '@app/services/MessageToastService';
import LogService from '../services/LogService';

const { baseUrl } = AppServer;

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const handleResponse = (res) => {
  console.log(res);
  LogService.debug('res', res);
  let body = {};
  try {
    body = JSON.parse(res._bodyText);
  } catch{ }
  console.log(body);
  if (res.status >= 200 && res.status < 300) {
    return body;
  }
  const message = body.message || codeMessage[res.status] || res.statusText;
  const error = new Error(message);
  error.status = res.status;
  error.response = res;
  throw error;
};

export default class Request {
  constructor(url, options) {
    this.url = url;
    this.options = options;
    return this.doFetch();
  }

  doFetch = async () => {
    const { url, options } = this;
    const newOptions = {
      ...options,
      'credentials': 'include'
    };

    // set headers
    const userHeaders = {
      'x-request-platform': Platform.OS,
      'x-request-version': Platform.Version
    }
    newOptions.headers = {
      ...newOptions.headers,
      ...userHeaders
    }
    if (newOptions.method === 'POST' || newOptions.method === 'PUT' || newOptions.method === 'DELETE') {
      if (!(newOptions.body instanceof FormData)) {
        newOptions.headers['content-type'] = 'application/json; charset=utf-8';
        newOptions.body = JSON.stringify(newOptions.body);
      } else {
        newOptions.headers['accpet'] = 'application/json';
      }
    }

    // set url
    let targetUrl = url;
    if (!url.startsWith('http')) {
      targetUrl = `${baseUrl}/api/${url.startsWith('/') ? url.slice(1) : url}`;
    }

    // fetch
    return fetch(targetUrl, newOptions)
      .then(handleResponse)
      .catch(e => {
        // LogService.warn(`Http(${targetUrl})错误`, e.status, e.message, e.response);
        // 处理异常
        const status = e.status;
        if (status === 401) {
          if (targetUrl.indexOf('accounts/login') >= 0) {
            // LogService.warn('登录出错');
          } else {
            MessageToastService.showWarn('登录过期，请重新登录');
            Actions.replace('login');
          }
        }
        if (status === 403) {
          // TODO: 没有权限
        }
        if (status <= 504 && status >= 500) {
          // TODO: 服务器错误
        }
        if (status >= 404 && status < 422) {
          // TODO: 没有找到服务器资源
        }
        // 其他的异常抛出去
        throw e;
      });
  }

  /**
   * GET
   * @param {*} url 
   * @param {*} options 
   */
  static get(url, options = {}) {
    options.method = 'GET';
    return new Request(url, options);
  }

  /**
   * POST
   * @param {*} url 
   * @param {*} options 
   */
  static post(url, options = {}) {
    options.method = 'POST';
    return new Request(url, options);
  }

  /**
   * PUT
   * @param {*} url 
   * @param {*} options 
   */
  static put(url, options = {}) {
    options.method = 'PUT';
    return new Request(url, options);
  }

  /**
   * DELETE
   * @param {*} url 
   * @param {*} options 
   */
  static delete(url, options = {}) {
    options.method = 'DELETE';
    return new Request(url, options);
  }
}