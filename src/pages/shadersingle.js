import React, { Component } from 'react';
import Shader from './../shader.js'

class ShaderSingle extends Component {
  render() {
    return (
      <div id="content">
        <Shader frag={this.props.frag}/>
      </div>
    );
  }
}

export default ShaderSingle;
