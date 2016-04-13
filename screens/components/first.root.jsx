'use strict';

import React from 'react';
import Slider from './slider.jsx';
import router from 'electron-request-response/render';

class FirstRoot extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      r: 0,
      g: 0,
      b: 0
    };
  }
  updateR (event) {
    console.log(+event.target.value);
    this.setState({r: +event.target.value});
    router.request('second-window', '/set-color', {
      r: +event.target.value,
      g: this.state.g,
      b: this.state.b
    });
  }
  updateG (event) {
    console.log(+event.target.value);
    this.setState({g: +event.target.value});
    router.request('second-window', '/set-color', {
      r: this.state.r,
      g: +event.target.value,
      b: this.state.b
    });
  }
  updateB (event) {
    console.log(+event.target.value);
    this.setState({b: +event.target.value});
    router.request('second-window', '/set-color', {
      r: this.state.r,
      g: this.state.g,
      b: +event.target.value
    });
  }
  render () {
    return (
      <span className='sliders-group'>
        <div className='label-slider-pair'>
          <div className='slider-label'>Red </div>
          <div className='slider'><Slider change={this.updateR.bind(this)} min={0} max={255} value={this.state.r}></Slider></div>
        </div>
        <div className='label-slider-pair'>
          <div className='slider-label'>Green </div>
          <div className='slider'><Slider change={this.updateG.bind(this)} min={0} max={255} value={this.state.g}></Slider></div>
        </div>
        <div className='label-slider-pair'>
          <div className='slider-label'>Blue </div>
          <div className='slider'><Slider change={this.updateB.bind(this)} min={0} max={255} value={this.state.b}></Slider></div>
        </div>
      </span>
    );
  }
}

export default FirstRoot;
