/**
 * 项目入口文件
 */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
/**
 * 引入 react-redux
 * connect
 * Provider
 */
import {
  connect,
  Provider
} from 'react-redux';

import store ,{history} from './store'
import { ConnectedRouter } from 'react-router-redux'
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
 * 引入 路由
 */
import { getRouterData } from './common/router';
/**
 * 引入 ant-design 样式表
 */
import 'ant-design-pro/dist/ant-design-pro.css';

import RenderAuthorized from 'ant-design-pro/lib/Authorized';

const Authorized = RenderAuthorized('');

const { AuthorizedRoute } = Authorized;

const routerData = getRouterData();

const UserLayout = routerData['/user'].component;

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route 
          path="/user"
          component={UserLayout}
        />
        <AuthorizedRoute
          path="/"
          render={props => <div>....</div>}
          authority={['admin', 'user']}
          redirectPath="/user/login"
        />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)