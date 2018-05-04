/**
 * 全局函数(全局状态<-->全局变量)
 */
// 严格模式
'use strict';
// 初始化
const initstate = {
  collapsed: false, // 菜单栏切换
  notices: [], // 通知数据
  fetchingNotices:false, // 请求通知数据
}

function global(state = initstate, {type,payload}){
  switch(type){
  	case 'changeLayoutCollapsed':
   	  return {
        ...state,
        collapsed: payload,
      }
    case 'saveNotices': // 保存通知栏数据
      return {
        ...state,
        notices:payload
      }
    case 'fetchNotices': // 请求通知栏数据
      return {
        fetchingNotices:true
      }
    case 'nofetchNotices': // 不请求通知栏数据
      return{
        ...state,
        fetchingNotices:false
      }
    default:
      return state
  }
}

export default global;