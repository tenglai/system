/**
 * 项目入口文件
 */
import React from 'react';
import ReactDOM from 'react-dom';
/**
 * 引入 redux
 * createStore
 * applyMiddleware
 * combineReducers
 * compose
 */
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
/**
 * 引入 react-redux
 * connect
 * Provider
 */
import { connect, Provider } from 'react-redux';
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
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
/**
 * 引入 ant-design 样式表
 */
import 'ant-design-pro/dist/ant-design-pro.css';

import createHistory from 'history/createBrowserHistory';
/**
 * 引入 react-router
 * Route
 * Switch
 */
import { Route, Switch } from 'react-router';
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

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <App />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// ReactDOM.render(<App />, document.getElementById('root'));