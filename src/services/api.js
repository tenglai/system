/**
 * 请求方法封装
 */
import axios from 'axios';
// 登录页数据
import data from '../mock/loginMock';
// 异步操作
export async function login(param){
  const { username, password, type } = param;

  return axios.get('/login').then(function(response){
    if(username === 'admin' && password === '123456'){
      return {
      	status: 'ok',
      	type: type,
      }
    }else{
      return {
      	status: 'error',
      	type: type,
      }
    }
  })
}