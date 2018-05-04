/**
 * login 页 模拟数据
 */
// 引入 mock.js 创建假数据
import Mock from 'mockjs';

const logindata = Mock.mock('/api/login',{
  "object|2":{
  	"310000":"上海市",
  	"320000":"江苏省",
  	"330000":"浙江省",
  	"340000":"安徽省"
  }
})

export default logindata;