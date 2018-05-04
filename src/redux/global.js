/**
 * 全局函数(全局状态<-->全局变量)
 */
// 严格模式
'use strict';
// 初始化
const initstate = {
  collapsed: false,
}

function global(state = initstate, {type,payload}){
  switch(type){
  	case 'changeLayoutCollapsed':
   	  return {
        ...state,
        collapsed: payload,
      }
    default:
      return state
  }
}

export default global;