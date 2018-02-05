import Nerv from 'nervjs'
// import { Component, createElement } from 'nervjs'
 
class Home extends Nerv.Component {
  // 构造器
  constructor () {
    super(...arguments)
    this.state = {
      message: '内容部分'
    }
  }
  
  // 渲染
  render () {
    return (
      <div>{this.state.message}</div>
    )
  }
}
 
export default Home;