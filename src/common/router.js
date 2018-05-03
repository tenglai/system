/**
 * 路由 配置
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
// 监测页
import Monitor  from '../routes/Dashboard/Monitor'

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
      component: BasicLayout,
    },
    "/user":{
      component:UserLayout,
    },
    "/user/login":{
      component:LoginPage,
      authority:'guest',
    },
    "/dashboard/analysis":{
      component:Analysis,
      authority:'admin'
    },
    "/dashboard/monitor":{
      component:Monitor,
      authority:'admin'
    }
  }
     
  const menuData = getFlatMenuData(getMenuData());

  const routerData = {};

  // The route matches the menu
  Object.keys(routerConfig).forEach((path) => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`/${key}`));
    let menuItem = {};
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey];
    }
    let router = routerConfig[path];
    // If you need to configure complex parameter routing,
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