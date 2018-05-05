/**
 *  用户管理页面(User)
 */
import React, { PureComponent } from 'react';
import {Route,Router,Link,Switch,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Styles from './index.less'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import { getRoutes } from '../../utils/utils';
// 用户列表
import UserList from './list'
// 添加用户
import UserAdd from './add'

class User extends PureComponent{

  state = {
    breadcrumbList:[ // 面包屑
      {
        title: '系统管理',
        href: '/syster',
      },
      {
        title: '用户管理',
      }
    ],
    title:"用户管理",
  }

  // 改变标题
  changeTitle=(val)=>{
    this.setState({
      ...this.state,
      title:val,
    })
  }

  render(){
    const { match, routerData, location } = this.props;
    const routes = getRoutes(match.path, routerData);

    return (
      <PageHeaderLayout breadcrumbList={this.state.breadcrumbList} title={this.state.title}>
        <Switch>
          {
            routes.map(item =>
              (
                <Route
                  key={item.key}
                  path={item.path}
                  render={()=><item.component changetitle={this.changeTitle.bind(this)} />}
                  exact={item.exact}
                />
              )
            )
          }
          <Redirect exact from="/syster/user" to="/syster/user/list" />
        </Switch>
      </PageHeaderLayout>
    )
  }
}

export default connect(({routerReducer})=>{
  return {
    location:routerReducer.location,
  }
})(User);
