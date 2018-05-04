/**
 * 基础 页面布局 组件(普通用户权限)
 */
/**
 * PureComponent 纯组件
 * 把继承类从 Component 换成 PureComponent 即可，可以减少不必要的 render操作的次数，从而提高性能
 */
import React, {PureComponent} from 'react';
import DocumentTitle from 'react-document-title';
import PropTypes from 'prop-types';
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
import {connect} from 'react-redux';
// 已经授权
import Authorized from '../utils/Authorized';
// 获取路由
import { getRoutes } from '../utils/utils';

const { Header, Sider, Content } = Layout;

const { AuthorizedRoute } = Authorized;

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
  // 组件传参
  static childContextTypes = {
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object,
  }
  // 初始化状态值
  state = {
    isMobile,
  };

  // 获取组件的传递的参数
  getChildContext() {
    const { location, routerData } = this.props;
    return {
      location,
      breadcrumbNameMap: routerData,
    };
  }
  
  // 生命周期--组件加载完毕
  componentDidMount() {
    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    });

    /**
     * 触发action
     * 获取当前用户信息
     */
    this.props.dispatch({
      type: 'fetchCurrent'
    });
  }
  
  // 菜单切换
  handleMenuCollapse = (collapsed) => {
    this.props.dispatch({
      type: 'changeLayoutCollapsed',
      payload: collapsed,
    });
  }

  // 获取页面标题
  getPageTitle() {
    return "主页";
  }

  // 底部header菜单栏点击事件
  handleMenuClick = ({ key }) => {
    if (key === 'triggerError') {
      //this.props.dispatch(routerRedux.push('/exception/trigger'));
      return;
    }
    if (key === 'logout') {
      this.props.dispatch({
        type: 'logout',
      });
    }
  }

  // 处理通知事项变更
  handleNoticeVisibleChange = (visible) => {
    if (visible) {
      this.props.dispatch({
        type: 'fetchNotices',
      });
    }
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
    // props
    const {
      currentUser, collapsed, fetchingNotices, notices, routerData, match, location,
    } = this.props;
    // 布局
    const layout = (
      <Layout>
        <SiderMenu
          menuData={getMenuData()}
          location={location}
          collapsed={collapsed}
          isMobile={this.state.isMobile}
          Authorized={Authorized}
          onCollapse={this.handleMenuCollapse}
        />

        <Layout>
          <GlobalHeader
            fetchingNotices={fetchingNotices}
            notices={notices}
            currentUser={currentUser}
            collapsed={collapsed}
            onCollapse={this.handleMenuCollapse}
            onMenuClick={this.handleMenuClick}
            onNoticeVisibleChange={this.handleNoticeVisibleChange}
          />
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <Switch>
              {
                redirectData.map(item =>
                  <Redirect key={item.from} exact from={item.from} to={item.to} />
                )
              }

              {
                getRoutes(match.path, routerData).map(item =>
                  (
                    <AuthorizedRoute
                      key={item.key}
                      path={item.path}
                      component={item.component}
                      exact={item.exact}
                      authority={item.authority}
                      redirectPath="/exception/403"
                    />
                  )
                )
              }

              <Redirect exact from="/" to={bashRedirect} />
            </Switch>
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

export default connect(({routerReducer,global,user})=>{
  return {
    location:routerReducer.location,
    collapsed:global.collapsed, // 菜单切换
    currentUser:user.currentUser, // 当前用户
    fetchingNotices:global.fetchingNotices, // 请求通知数据
    notices:global.notices, // 通知数据
  }
})(BasicLayout);