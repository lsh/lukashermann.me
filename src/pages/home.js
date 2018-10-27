import React, { Component } from 'react';
import Shader from './../shader.js';
import * as fs from './../shaders/homepage.js';

class Home extends Component {
  render() {
    return (
      <div id="content">
				I am an artist & designer currently studying architecture at Carnegie Mellon University.
				I have experience working with physical installation art, live performance, web design, graphic design, animation & WebGL.
				You can see a lot of my work on <a href="http://instagram.com/lukashermann_">Instagram</a>, and browse my code on <a href="http://github.com/lsh">GitHub</a>.
        <Shader frag={fs.default} />
      </div>
    );
  }
}

export default Home;
