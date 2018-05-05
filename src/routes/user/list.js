/**
 * 用户列表页
 */
import React,{PureComponent} from 'react';
import {connect} from 'react-redux';

/**
 *  用户列表
 */
class UserList extends PureComponent{
  // 生命周期--组件加载完毕
  componentDidMount(){
    this.props.changetitle("用户管理")
  }

  render(){
    return(
      <div>用户管理</div>
    )
  }
}

export default connect ((state)=>(
  {
    state
  }
))(UserList)
