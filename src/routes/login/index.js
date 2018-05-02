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
// 链接列表
const links = [{
  key: 'help',
  title: '帮助',
  href: '',
},{
  key: 'privacy',
  title: '隐私',
  href: '',
},{
  key: 'terms',
  title: '条款',
  href: '',
}];

// 版权
const copyright = <div>Copyright <Icon type="copyright" /> 2018 蚂蚁金服体验技术部出品</div>;

// 登录页 组件
class LoginPage extends Component {
  // 构造器
  constructor(props) {
    super(props);
    
    this.state = {
      notice: this.props.notice, // 通知
      type: this.props.type,
      autoLogin: this.props.autoLogin, // 自动登录
      submitting: this.props.submitting // 登录状态(旋转图标)
    };
  }

  // 提交操作
  onSubmit = (err, values) => {
    console.log('value collected ->', { ...values, autoLogin: this.state.autoLogin });
    if (this.state.type === 'tab1') {
      this.setState({
        notice: '',
      }, () => {
        if(!err){
          this.setState({
            submitting:true
          })

          setTimeout(() => {   
            this.props.dispatch({
              type:'getToken',
              payload:{
                ...values
              }
            })
          }, 1500);
        }
      });
    }
    // if(this.state.type === 'tab1'){ // 账号密码登录
    //   this.setState({
    //     notice: '',
    //   }, () => {
    //     if(!err){
    //       this.setState({
    //         submitting: true
    //       })

    //       setTimeout(() => {
    //         this.props.dispatch({
    //           type: 'getToken',
    //           payload: {
    //             ...values
    //           }
    //         })
    //       }, 1500);
    //     }
    //   });
    // }
  }

  // 选项卡切换事件
  onTabChange = (key) => {
    this.setState({
      type: key
    })
  }

  // 自定登录选中和取消事件
  changeAutoLogin = (e) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  }

  // 页面渲染
  render(){
    return (
      <DocumentTitle title={'登录'}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo" className={styles.logo} src={logo} />
                  <span className={styles.title}>Ant Design</span>
                </Link>
              </div>
              <div className={styles.desc}>Ant Design 是西湖区最具影响力的Web设计规范</div>
            </div>
            {/* 选项卡 */}
            <div className={styles.main}>
              <Login
                defaultActiveKey={this.state.type}
                onTabChange={this.onTabChange}
                onSubmit={this.onSubmit}
              >
                <Tab key="tab1" tab="账号密码登录">
                  {
                    this.state.notice &&
                    <Alert style={{marginBottom: 24}} message={this.state.notice} type="error" showIcon closable />
                  }
                  <UserName name="username" />
                  <Password name="password" />
                </Tab>
                <Tab key="tab2" tab="手机号登录">
                  <Mobile name="mobile" />
                  <Captcha onGetCaptcha={() => console.log('Get captcha!')} name="captcha" />
                </Tab>
                <div>
                  <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>自动登录</Checkbox>
                  <a style={{float:'right'}} href="">忘记密码</a>
                </div>
                <Submit loading={this.state.submitting}>登录</Submit>
              </Login>
            </div>
          </div>
          <GlobalFooter links={links} copyright={copyright} />
        </div>
      </DocumentTitle>
    );
  }
}

export default connect(({login}) => {
  return{
    ...login
  }
})(LoginPage)