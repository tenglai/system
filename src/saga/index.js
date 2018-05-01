/**
 * saga 入口文件
 * 异步流 redux-saga
 */
// 引入 redux-saga
import { put, takeEvery, fork, all } from 'redux-saga/effects';
// 登录页 模拟数据
import loginSaga from './loginSaga';

// 所有的saga的入口配置文件
const config = [
  fork(loginSaga)
];

export default function* rootSaga(){
  yield all(config)
}
