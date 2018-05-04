/**
 * 全局异步数据(通知栏数据)
 */
import { put,takeLatest,call,select } from 'redux-saga/effects'
import { queryNotices } from '../services/api';

// 请求通知栏数据
function* fetchNotices(){

  const data = yield call(queryNotices);

  yield put({
    type: 'saveNotices', // 
    payload: data,
  });

  yield put({
    type: 'changeNotifyCount',
    payload: data.length,
  });

  yield put({
    type:'nofetchNotices'
  })
}

// 清除通知栏信息
function* clearNotices({payload}){
  yield put({
    type: 'saveClearedNotices',
    payload,
  });
}

//
function* global() {
  // 请求通知栏数据
  yield takeLatest('fetchNotices', fetchNotices)
  // 清空通知栏数据
  yield takeLatest('clearNotices', clearNotices)
}

export default global;