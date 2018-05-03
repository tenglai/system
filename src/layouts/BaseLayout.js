/**
 * 基础 页面布局 组件(普通用户权限)
 */
/**
 * PureComponent 纯组件
 * 把继承类从 Component 换成 PureComponent 即可，可以减少不必要的 render操作的次数，从而提高性能
 */
import React, {PureComponent} from 'react'
import DocumentTitle from 'react-document-title'
import { Layout, Icon, message, Menu} from 'antd';
import {Switch,Route,Redirect,HashRouter} from 'react-router-dom'
import classNames from 'classnames';
// 获取菜单栏信息
import { getMenuData } from '../common/menu';
// 响应css媒体查询的轻量级javascript库
import { enquireScreen } from 'enquire-js';
import logo from '../assets/logo.svg';
import styles from  './BaseLayout.less';
// 侧边菜单栏
import SiderMenu from '../components/SiderMenu';
// 顶部标题栏
import GlobalHeader from '../components/GlobalHeader';

const { Header, Sider, Content } = Layout;

/**
 * 根据菜单取得重定向地址.
 */
const redirectData = [];
const getRedirect = (item) => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        from: `/${item.path}`,
        to: `/${item.children[0].path}`,
      });
      item.children.forEach((children) => {
        getRedirect(children);
      });
    }
  }
};
getMenuData().forEach(getRedirect);

/**
 * 屏幕
 */
const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
  },
};

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

class BasicLayout extends PureComponent{
  // 初始化状态值
  state = {
    collapsed: false,
  };

  // getChildContext() {
  //   const { location, routerData } = this.props;
  //   return {
  //     location,
  //     breadcrumbNameMap: routerData,
  //   };
  // }
  
  // 生命周期--组件加载完毕
  componentDidMount() {
    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    });
  }
  
  getPageTitle() {
    return "主页";
  }

  // 根据URL参数重定向
  getBashRedirect = () => {
    // 这里是重定向的,重定向到 url 的 redirect 参数所示地址
    const urlParams = new URL(window.location.href);

    const redirect = urlParams.searchParams.get('redirect');
    // 删除URL中的参数
    if (redirect) {
      urlParams.searchParams.delete('redirect');
      window.history.replaceState(null, 'redirect', urlParams.href);
    } else {
      return '/dashboard/analysis';
    }
    return redirect;
  }
      
  render() {
    // 重定向
    const bashRedirect = this.getBashRedirect();
    // 布局
    const layout = (
      <Layout>
        <SiderMenu 
          collapsed={this.state.collapsed}
          isMobile={this.state.isMobile}  
        />

        <Layout>
          <GlobalHeader
            collapsed={this.state.collapsed}
          />
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <HashRouter>
              <Switch>
                {
                  redirectData.map(item =>
                    <Redirect key={item.from} exact from={item.from} to={item.to} />
                  )
                }
                <Redirect exact from="/" to={bashRedirect} />
              </Switch>
            </HashRouter>
          </Content>
        </Layout>
      </Layout>
    )

    return (
      <DocumentTitle title={this.getPageTitle()}>
        {layout}
      </DocumentTitle>
    );
  }

}
export default BasicLayout;