/**
 * 用户信息(user)
 */
// 初始状态值
const initstate = {
  list:[],
  listloading:true, // 列表加载状态
  currentUser:{} // 当前用户
}

/**
 * 用户
 * payload是一种以JSON格式进行数据传输的一种方式。
 */
function user(state = initstate, {type,payload}){
  switch(type){
  	case 'currentUser': // 当前用户
   	  return {
        ...state
      }
    case 'saveCurrentUser': // 保存当前用户
      return {
        ...state,
        currentUser:payload.$body
      }
    case 'changeNotifyCount': // 处理通知
      return {
          ...state,
          currentUser: {
            ...state.currentUser,
            notifyCount: payload,
          },
        };
    case 'listload': // 列表数据加载状态
      return {
        ...state,
        listloading:payload,
      }
    case 'userList': // 用户列表数据
      return {
        ...state,
        list:payload,
      }  
    default:
      return state
  }
}

export default user;