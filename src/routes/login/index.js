import React, { Component } from 'react';
/**
 * Provider提供的是一个顶层容器的作用，实现store的上下文传递
 * connect可以把state和dispatch绑定到react组件，使得组件可以访问到redux的数据
 */
import { connect } from 'react-redux';
/**
 * Link是react路由中的点击切换到哪一个组件的链接
 */
import { Link } from 'react-router-dom';
// 引入 antd UI库
import { Icon, Alert, Checkbox } from 'antd';
// 引入 logo
import logo from '../../assets/logo.svg';
// 引入 ant-design-pro
import Login from 'ant-design-pro/lib/Login';
// 引入 样式表
import styles from './login.less';
// 引入 GlobalFooter
import GlobalFooter from 'ant-design-pro/lib/GlobalFooter';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
