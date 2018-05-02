// 使用LoalStand存储权限信息，可以在实际项目中发送给服务器。
export function getAuthority() {
  return localStorage.getItem('antd-pro-authority') || 'admin';
}
  
export function setAuthority(authority) {
  return localStorage.setItem('antd-pro-authority', authority);
}