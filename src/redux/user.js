/**
 * 用户信息(user)
 */
// 初始状态值
const initstate = {
  list:[],
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
    case 'changeNotifyCount': // 
      return {
          ...state,
          currentUser: {
            ...state.currentUser,
            notifyCount: payload,
          },
        };
    default:
      return state
  }
}

export default user;