/**
 * 登录页
 */
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
// 引入 react-document-title
import DocumentTitle from 'react-document-title';
// 引入 react-router-redux
import { push } from 'react-router-redux';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

// 登录页 组件
class LoginPage extends Component {
  // 初始化 state
  state = {
    type: 'account',
    autoLogin: true,
  }

  // 选项卡切换事件
  onTabChange = (key) => {
    this.setState({
      type: key
    })
  }

  // 登录按钮点击事件
  onSubmit = (err, values) => {
    const { type } = this.state;
    // 向 redux 传参,调用 action
    this.props.dispatch({
      type: 'loading'
    })

    if(!err){
      setTimeout(() => {
        this.props.dispatch({
          type:'getToken',
          payload:{
            ...values,
            type,
          }
        })
      }, 1200);
    }
  }

  // 自定登录选中和取消事件
  changeAutoLogin = (e) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  }

  // 页面渲染
  render(){
    const { login } = this.props;

    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={this.state.type}
          onTabChange={this.onTabChange}
          onSubmit={this.onSubmit}
        >
          <Tab key="account" tab="账号密码登录">
            {
              login.status === 'error' &&
              login.type === 'account' &&
              <Alert style={{marginBottom: 24}} message={'账号密码错误'} type="error" showIcon closable />
            }
            <UserName name="username" />
            <Password name="password" />
          </Tab>
          <Tab key="mobile" tab="手机号登录">
            {
              login.status === 'error' &&
              login.type === 'mobile' &&
              <Alert style={{marginBottom: 24}} message={'账号密码错误'} type="error" showIcon closable />
            }
            <Mobile name="mobile" />
            <Captcha onGetCaptcha={() => console.log('Get captcha!')} name="captcha" />
          </Tab>
          <div>
            <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>自动登录</Checkbox>
            <a style={{float:'right'}} href="">忘记密码</a>
          </div>
          <Submit loading={login.submitting}>登录</Submit>
        </Login>
      </div>
    );
  }
}

export default connect(({login}) => {
  return{
    login,
  }
})(LoginPage)
