/**
 * 首页(Main)
 */
import React, { Component } from 'react';
// 引入 UI库
import { Button, Modal } from 'antd';
// 创建类
class Main extends Component {
  // 构造器
  constructor(props) {
    super(props);
    // 默认值
    this.state = {
      visible: false
    };
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  }

  handleOk = (e) => {
    this.setState({
      visible: false
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false
    });
  }

  // 渲染
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>打开模态框</Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}

export default Main;
