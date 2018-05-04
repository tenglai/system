/**
 * redux 入口文件
 */
import React from 'react';
// 合并 reducer
import { combineReducers } from 'redux';
// reducer与按需加载组件的时候，一并加载对应的state
import { routerReducer } from 'react-router-redux';
// 引入 login reducer
import login from './login';
// 引入 全局状态(全局变量)
import global from './global';
// 引入 用户信息
import user from './user';

// 配置项
const config = {
  routerReducer,
  login,
  global,
  user,
}

// 向外暴露
export default combineReducers(config);
