import Nerv from 'nervjs'
// import { Component, createElement } from 'nervjs'
 
class Hello extends Nerv.Component {
  // 构造器
  constructor () {
    super(...arguments)
    this.state = {
      message: '左侧菜单'
    }
  }
  
  // 渲染
  render () {
    let side = {
      "width": "200px",
      "height": "200px",
      "backgroundColor": "#000"
    }

    return (
      <div style={side}>
        <div>{this.state.message}</div>
      </div>
    )
  }
}
 
export default Hello