/**
 * login reducer
 */
// 严格模式
'use strict'
import { combineReducers } from 'redux';
// 初始化状态
const initstate = {
  notice: '', // 通知
  type: 'tab1', // 选项卡类型
  autoLogin: '', // 自动登录
  submitting: false // 登录状态(正在提交)
}

// 登录
function login(state = initstate, {type,payload}){
  // 判断
  switch(type){
    case 'commonlogin': // 账号密码登录
    // console.log(payload);
      return {
        ...state,
        ...payload
      }
    case 'mobilelogin': // 手机账号登录
      return state
    default:
      return state
  }
}

export default login;
