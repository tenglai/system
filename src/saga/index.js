/**
 * 异步redux的入口
 * 异步流 redux-saga
 */
// 引入 redux-saga
import {
  put,
  takeEvery,
  fork,
  all
} from 'redux-saga/effects';
// 登录页 模拟数据
import loginSaga from './loginSaga';
// 用户信息
import userSaga from './userSaga';
// 通知栏数据
import global from './globalSaga';

// 所有的saga的入口配置文件
const config = [
  fork(loginSaga),
  fork(userSaga),
  fork(global),
];

export default function* rootSaga(){
  yield all(config)
}
