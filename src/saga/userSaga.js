/**
 * 用户数据
 */
// 引入 redux-saga
import { put, takeEvery, call, select } from 'redux-saga/effects';
// 当前用户 请求
import { getCurrent as gCurrent } from '../services/api';
//声明时需要添加*，普通函数内部不能使用yield关键字，否则会出错
function* getCurrent(){
  const response = yield call(gCurrent);
  console.log(response);
  yield put({
  	type: 'saveCurrentUser',
    payload: response,
  })
}

// 用户
function* userSaga(){
  yield takeEvery('fetchCurrent', getCurrent)
}

export default userSaga;