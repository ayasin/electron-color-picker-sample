'use strict';

import React from 'react';
import router from 'electron-request-response/render';

class SecondWindow extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      r: 0,
      g: 0,
      b: 0,
      undertext: 'click the background color hex code to copy to clipboard'
    };
    router.registerRoute('/set-color', (data, callback) => {
      this.setState({r: data.r, g: data.g, b: data.b, undertext: 'click the background color hex code to copy to clipboard'});
      callback(null, '');
    });
  }
  sendCopyMessage (e) {
    // we can technically access the clipboard here, but the point of this is
    // to demo communications between the parts of the app ;P.
    router
      .request(router.CONSTANTS.MAIN_PROCESS_HOST, '/copy-to-clipboard', e.target.innerHTML)
      .then(() => {
        // success...let the user know
        this.setState({undertext: 'copied!'});
      })
      .catch((err) => {
      // failure
        console.log(err);
      });
  }
  render () {
    let backgroundColor = ('#' +
      ('0' + this.state.r.toString(16)).slice(-2) +
      ('0' + this.state.g.toString(16)).slice(-2) +
      ('0' + this.state.b.toString(16)).slice(-2)).toUpperCase();

    let textColor = '#' +
      ('0' + ((this.state.r + 128) % 256).toString(16)).slice(-2) +
      ('0' + ((this.state.g + 128) % 256).toString(16)).slice(-2) +
      ('0' + ((this.state.b + 128) % 256).toString(16)).slice(-2);

    return (
      <div className='color-box' style={{backgroundColor: backgroundColor}}>
        <div className='color-indicator' style={{color: textColor}} onClick={this.sendCopyMessage.bind(this)}>
          {backgroundColor}
        </div>
        <div style={{color: textColor, fontSize: '0.7em'}}>({this.state.undertext})</div>
      </div>
    );
  }
}

export default SecondWindow;
