/**
 * 登录页数据
 */
// 引入 redux-saga
import { put, takeEvery, call } from 'redux-saga/effects';
/**
 * 引入 react-router-redux
 * push 页面跳转
 */
import { push } from 'react-router-redux';
// 登录 请求
import { login } from '../services/api';
//声明时需要添加*，普通函数内部不能使用yield关键字，否则会出错
function* logincheck({payload}){
  const response = yield call(login, payload);
  yield put({
  	type: 'commonlogin',
  	payload: {
  	  ...response,
  	}
  })

  if(response.status === 'ok'){
  	yield put(push("home"))
  }
}

function* loginSaga(){
  yield takeEvery('getToken', logincheck)
}

export default loginSaga;