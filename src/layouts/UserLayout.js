/**
 * 登录布局
 */
import React from 'react';

import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
// 经授权的
import Authorized from '../utils/Authorized';
import {Switch,Link,Route,Redirect} from 'react-router-dom'
import GlobalFooter from 'ant-design-pro/lib/GlobalFooter';
import { getRoutes } from '../utils/utils';
import styles from './UserLayout.less';
import logo from '../assets/logo.svg';
import LoginPage from '../routes/login/index'
// 获取授权
import { getAuthority } from '../utils/authority';

const links = [{
  key: 'help',
  title: '帮助',
  href: '',
}, {
  key: 'privacy',
  title: '隐私',
  href: '',
}, {
  key: 'terms',
  title: '条款',
  href: '',
}];

const copyright = <div>Copyright <Icon type="copyright" /> 2018 润安科技软件部出品</div>;

class UserLayout extends React.PureComponent {
  
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = 'Ant Design Pro';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - Ant Design Pro`;
    }
    return title;
  }

  render() {
    const { routerData, match } = this.props;
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container} style={{ minHeight: '100vh' }}>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo" className={styles.logo} src={logo} />
                  <span className={styles.title}>OA 管理系统</span>
                </Link>
              </div>
              <div className={styles.desc}>OA管理系统 仅用于润安科技内部办公使用</div>
            </div>
            <Switch>
                    
              {getRoutes(match.path, routerData).map(item =>
                (
                  // <AuthorizedRoute
                  //   key={item.key}
                  //   path={item.path}
                  //   component={item.component}
                  //   exact={item.exact}
                  //   authority={item.authority}
                  //   redirectPath="/exception/403"
                  // />
                  <Route
                    key={item.key}
                    path={item.path}
                    component={item.component}
                    exact={item.exact}
                  />
                )
              )}
              <Redirect exact from="/user" to="/user/login" />
            </Switch>
          </div>
          <GlobalFooter links={links} copyright={copyright} />
        </div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;