/**
 * 请求方法封装
 */
import axios from 'axios';
// 请求函数封装
import request from '../utils/request';
// 登录页数据
import data from '../mock/loginMock';
// 异步操作
export async function login(param){
  const { username, password, type } = param;

  return axios.get('/api/login').then(function(response){
    if(username === 'admin' && password === '888888'){
      return {
      	status: 'ok',
      	type: type,
        currentAuthority:'admin'
      }
    }else if(username === 'user' && password === '123456'){
      return {
        status: 'ok',
        type,
        currentAuthority: 'user'
      }
    }else{
      return {
      	status: 'error',
      	type: type,
      }
    }
  })
}

// 当前用户信息
export async function getCurrent(param){
  return {
    $desc: "获取当前用户接口",
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      notifyCount: 12,
    },
  } 
}