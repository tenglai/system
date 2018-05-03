/**
 * 菜单栏数据
 */
import { isUrl } from '../utils/utils';
// 数据
const menuData = [
  {
    name: 'dashboard',
    icon: 'dashboard',
    path: 'dashboard',
    children: [{
      name: '分析页',
      path: 'analysis',
    },{
      name: '监控页',
      path: 'monitor',
    },{
      name: '工作台',
      path: 'workplace',
      // hideInMenu: true,
    }],
  },
  {
    name: '账号',
    icon: 'user',
    path: 'user',
    authority: 'admin',
    children: [{
      name: '登录',
      path: 'login',
    },{
      name: '注册',
      path: 'register',
    },{
      name: '注册结果',
      path: 'register-result',
    }]
  }
]

// 数据过滤处理
function formatter(data, parentPath = '', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);