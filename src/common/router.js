/**
 * 路由配置文件
 */
import {createElement} from 'react'
import { getMenuData } from './menu';
import pathToRegexp from 'path-to-regexp';
// 登录页
import LoginPage from '../routes/login/index';
// 首页
import Main from '../routes/home/index';
// 基础页面(页面布局--普通用户)
import BasicLayout from '../layouts/BaseLayout';
// 用户管理页
import User from '../routes/user/index';
// 用户管理页(页面布局--管理员)
import UserLayout from '../layouts/UserLayout';
// 分析页
import Analysis  from '../routes/Dashboard/Analysis'
// 用户管理页
import UserManager from '../routes/user';
import UserList from '../routes/user/list';
import UserAdd from '../routes/user/add';

// 路由数据
let routerDataCache;

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach((item) => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}



export const getRouterData = () => {
  const routerConfig = {
    "/":{
      component: BasicLayout, // 后台布局
    },
    "/user":{
      component:UserLayout, // 登录布局
    },
    "/user/login":{
      component:LoginPage, // 登录页
      authority:'guest',
    },
    "/dashboard/analysis":{
      component:Analysis, // 总览
      authority:'admin'
    },
    "/syster/user":{
      component:UserManager, // 用户管理页
      authority:'admin'
    },
    "/syster/user/list":{
      component:UserList, // 用户列表
      authority:'admin'
    },
    "/syster/user/add":{
      component:UserAdd, // 添加用户
      authority:'admin'
    },
  }
     
  const menuData = getFlatMenuData(getMenuData());

  const routerData = {};

  // 路由匹配菜单
  Object.keys(routerConfig).forEach((path) => {
    // 匹配项名称规则
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`/${key}`));
    let menuItem = {};
    // 如果menuKey不是空的
    if (menuKey) {
      menuItem = menuData[menuKey];
    }
    let router = routerConfig[path];
    // 如果需要配置复杂参数路由
    // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    // eg . /list/:type/user/info/:id
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
    };
    routerData[path] = router;
  });

  Object.values(routerConfig).forEach((v)=>{
    let {component} = v;
    component.defaultProps={routerData}
  })

  return routerData;
}