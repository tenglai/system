import Nerv from 'nervjs'
// import { Component, createElement } from 'nervjs'
// 引入组件
import SideMenu from './components/SideMenu/SideMenu'
import Home from './pages/Home/Home.js'
 
class App extends Nerv.Component {
  // 构造器
  constructor () {
    super(...arguments)
    this.state = {
      message: ''
    }
  }
  
  // 渲染
  render () {
    return (
      <div>
        {/*左侧菜单*/}
        <SideMenu />
        {/*左侧内容部分*/} 
        <Home />
      </div>
    )
  }
}
 
export default App;