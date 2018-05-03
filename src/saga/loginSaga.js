/**
 * 登录页数据
 */
// 引入 redux-saga
import { put, takeEvery, call, select } from 'redux-saga/effects';
/**
 * 引入 react-router-redux
 * push 页面跳转
 */
import { push,replace } from 'react-router-redux';
// 登录 请求
import { login } from '../services/api';
// 重新加载权限组件
import { reloadAuthorized } from '../utils/Authorized';
//声明时需要添加*，普通函数内部不能使用yield关键字，否则会出错
function* logincheck({payload}){
  const response = yield call(login, payload);
  // console.log(response);
  yield put({
  	type: 'commonlogin',
  	payload: {
  	  ...response,
  	}
  })

  if(response.status === 'ok'){

    reloadAuthorized();

  	yield put(push("/"))
  }
}

// 注销
function* logout({payload}){

  try {
    // 获取位置路径名
    const urlParams = new URL(window.location.href);
    const pathname = yield select(state => state.routing.location.pathname);
    // 在URL中添加参数
    urlParams.searchParams.set('redirect', pathname);
    window.history.replaceState(null, 'login', urlParams.href);
  } finally {
    yield put({
      type: 'commonlogin',
      payload: {
        status: false,
        currentAuthority: 'guest',
      },
    });
    reloadAuthorized();
    yield put(push('/user/login'));
  }
}

// 异步登录
function* loginSaga(){
  yield takeEvery('getToken', logincheck)
}

export default loginSaga;