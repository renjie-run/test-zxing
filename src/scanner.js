import React from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';

class Scanner extends React.Component {

  constructor(props) {
    super(props);
    this.codeReader = new BrowserMultiFormatReader();
  }

  componentDidMount() {
    // const _hasCamera = this.hasCamera();
    // if (!_hasCamera) return;
    this.loadCameraData();
    // document.addEventListener('click', this.onCloseCamera)
  }

  componentWillUnmount() {
    // document.removeEventListener('click', this.onCloseCamera)
  }

  hasCamera = () => {
    return navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  }

  loadCameraData = () => {
    this.codeReader.getVideoInputDevices().then((videoInputDevices) => {
      this.codeReader.decodeFromInputVideoDeviceContinuously(undefined, 'video', (result, err) => {
        if (!this.scanRef.style.animation) {
          this.scanRef.style.animation = 'scanCode 3s linear infinite';
        }
        if (result) {
          console.log(result)
          // this.props.changeInputValue(result.text);
        }
      });
    });
  }

  onCloseCamera = () => {
    this.codeReader.reset();
    this.props.onShowQrReaderToggle();
  }

  render() {
    return (
      <div className="custom-scan-container">
        <video
          id="video"
          width="300"
          height="200"
        ></video>
      </div>
    );
  }
}

export default Scanner;
