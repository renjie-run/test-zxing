import React from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
import 'webrtc-adapter';

class Scanner extends React.Component {
  constructor(props) {
    super(props);
    this.codeReader = new BrowserMultiFormatReader();
    this.scanned = false; // 新增：防止重复触发
    this.state = {
      resultText: ''
    };
  }

  componentDidMount() {
    this.loadCameraData();
  }

  componentWillUnmount() {
    this.codeReader.reset(); // 卸载时关闭摄像头
  }

  loadCameraData = () => {
    this.codeReader.listVideoInputDevices()
      .then((videoInputDevices) => {
        if (videoInputDevices.length === 0) {
          console.error('没有检测到摄像头');
          return;
        }
        const firstDeviceId = videoInputDevices[0].deviceId;

        this.codeReader.decodeFromVideoDevice(firstDeviceId, 'video', (result, error) => {
          if (result && !this.scanned) {
            console.log('识别结果：', result.text);
            this.setState({ resultText: result.text }, () => {
              this.codeReader.reset();
              this.scanned = true;
            });
          }

          if (error && !(error instanceof NotFoundException)) {
            console.error(error);
          }
        });
      })
      .catch((error) => {
        console.error('摄像头初始化失败', error);
      });
  }

  render() {
    return (
      <div className="custom-scan-container">
        <video
          id="video"
          width="300"
          height="200"
        ></video>
        结果是：{this.state.resultText}
      </div>
    );
  }
}

export default Scanner;
