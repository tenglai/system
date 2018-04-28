import React, { Component } from 'react';
// 引入 路由
import { Route, Link, Switch } from 'react-router-dom';
// 引入 页面
import LoginPage from './login/index';
import Main from './home/index';

const baseRoute = () => (
  <div>
    {/*exact用于精准匹配路径，不用exact也会匹配到匹配的路径的子路径*/}
    <Route exact path="/" component={LoginPage} />
    <Route exact path="/home" component={Main} />
  </div>
);

export default baseRoute;
