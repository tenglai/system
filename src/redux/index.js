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

// 配置项
const config = {
  routerReducer,
  login,
}

// 向外暴露
export default combineReducers(config);
