import React from 'react';

class Slider extends React.Component {
  render () {
    return (
      <input
        type='range'
        value={this.props.value}
        onInput={this.props.change}
        min={this.props.min || 0}
        max={this.props.max}
        step={this.props.step || 1}
        style = {{width: '100%'}}>
      </input>
    );
  }
}

Slider.propTypes = {
  change: React.PropTypes.func.isRequired,
  min: React.PropTypes.number,
  max: React.PropTypes.number.isRequired,
  value: React.PropTypes.number.isRequired,
  step: React.PropTypes.number
};

export default Slider;
