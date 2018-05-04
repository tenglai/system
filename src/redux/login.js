/**
 * login reducer
 */
// 严格模式
'use strict'
// 设置权限
import { setAuthority } from '../utils/authority';
// 初始化状态
const initstate = {
  status: undefined, // 状态
  submitting: false // 登录状态(正在提交)
}

// 账号密码登录
function commonlogin(state,type,payload){
  // 设置权限
  setAuthority(payload.currentAuthority);
  
  return {
    ...state,
    status:payload.status,
    type:payload.type,
    submitting:payload.status == 'error'?false:true,
  }
}

// 登录
function login(state = initstate, {type,payload}){
  // 判断
  switch(type){
    case 'commonlogin': // 账号密码登录
      return commonlogin(state,type,payload)
    case 'tologin': // 跳转登录
      return {
        ...state,
        status:payload.status,
        type:payload.type,
        submitting:false,
      }
    case 'mobilelogin': // 手机账号登录
      return state
    case 'loading': // 登录按钮显示 loading
      return {
        ...initstate,
        submitting:true
      }
    default:
      return state
  }
}

export default login;
