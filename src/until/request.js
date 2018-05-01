/**
 * 请求函数封装
 */
// 引入 通知提醒框
import { notification } from 'antd';
// 引入 axios
import axios from 'axios';
// 引入 store
import store from '../index';
// 引入 react-router-redux
import { push } from 'react-router-redux';

const codeMessage = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据,的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时',
}

// 状态检测
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  // 错误通知提醒框
  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: errortext,
  });
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       请求路径
 * @param  {object} [options] 参数
 * @return {object}           返回值
 */
export default function request(url, options) {
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers,
    };
    newOptions.body = JSON.stringify(newOptions.body);
  }
  
  return axios(url, newOptions)
  .then(checkStatus)
  .then((response) => {
    if (newOptions.method === 'DELETE' || response.status === 204) {
      return response.text();
    }
    return response.json();
  })
  .catch((e) => {
    const { dispatch } = store;
    const status = e.name;
    if (status === 401) {
      dispatch({
        type: 'login/logout',
      });
      return;
    }
    if (status === 403) {
      dispatch(push('/exception/403'));
      return;
    }
    if (status <= 504 && status >= 500) {
      dispatch(push('/exception/500'));
      return;
    }
    if (status >= 404 && status < 422) {
      dispatch(push('/exception/404'));
    }
  });
}