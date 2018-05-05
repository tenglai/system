/**
 * 用户数据
 */
// 引入 redux-saga
import { put, takeLatest, call, select } from 'redux-saga/effects';
// 当前用户 请求
import { getCurrent as gCurrent, getuserlist } from '../services/api';
//声明时需要添加*，普通函数内部不能使用yield关键字，否则会出错
function* getCurrent(){
  const response = yield call(gCurrent);
  // console.log(response);
  yield put({
  	type: 'saveCurrentUser',
    payload: response,
  })
}

// 获取用户列表数据
function* getUserList(){
  const response = yield call(getuserlist) 

  yield put({
    type:'userList',
    payload:response.users,
  })

  yield put({
    type:'listload',
    payload:false,
  })
}

// 用户
function* userSaga(){
  yield takeLatest('fetchCurrent', getCurrent)

  yield takeLatest('getuserlist', getUserList)
}

export default userSaga;