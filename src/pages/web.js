import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom"
import shaders from './../shaders/contents.js';
import Shader from './../shader.js';

const shaderList = shaders.map((shader) =>
  <li key={shader.default.id}>
      <Link to={"/web/" + shader.default.slug}>{shader.default.name}</Link>
      <Route path={"/web/" + shader.default.slug} render={() => <Shader frag={shader.default.frag}/>}/>
  </li>
);


class Web extends Component {
  render() {
    return (
      <div id="content">
       <Router>
				<ul>
          {shaderList}
				</ul>
       </Router>
      </div>
    );
  }
}

export default Web;
