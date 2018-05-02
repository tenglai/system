/**
 * 项目入口文件
 */
import React from 'react';
import { render } from 'react-dom';
/**
 * 引入 redux
 * createStore
 * applyMiddleware
 * combineReducers
 * compose
 */
import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose
} from 'redux';
/**
 * 引入 react-redux
 * connect
 * Provider
 */
import {
  connect,
  Provider
} from 'react-redux';
/**
 * 引入 createSagaMiddleware
 * createSagaMiddleware
 */
import createSagaMiddleware from 'redux-saga';
/**
 * 引入 react-router-redux
 * ConnectedRouter
 * routerReducer
 * routerMiddleware
 * push
 */
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
  push
} from 'react-router-redux';
/**
 * 引入 history
 */

import createHistory from 'history/createBrowserHistory';
/**
 * 引入 react-router
 * Route 是路由的一个原材料，它是控制路径对应显示的组件。我们经常用的是exact、path以及component属性。
 * Switch 常常会用来包裹Route，它里面不能放其他元素，用来只显示一个路由。
 */
import {
  Route,
  Switch
} from 'react-router';
/**
 * 引入 react-router-dom
 * Redirect 重定向
 */
import { Redirect } from 'react-router-dom';
/**
 * 引入 reducer
 */
import reducer from './redux';
/**
 * 引入 ant-design 样式表
 */
import 'ant-design-pro/dist/ant-design-pro.css';
/**
 * 引入 主文件
 */
import App from './App';
/**
 * 引入 异步流
 */
import rootSaga from './saga';

const history = createHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const middlewares = [routerMiddleware(history), sagaMiddleware];

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga)

export {
  store
};

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <App />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)