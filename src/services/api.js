/**
 * 请求方法封装
 */
import axios from 'axios';
// 登录页数据
import data from '../mock/loginMock';
// 异步操作
export async function login(param){
  return axios.get('/login').then(function(response){
    return response.data;
  })
}