import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom"
import shaders from './../shaders/contents.js';
import Shader from './../shader.js';

const shaderList = shaders.map((shader) =>
  <li key={shader.default.id}>
      <Link to={"/web/" + shader.default.slug}>{shader.default.name}</Link>
      <Route key={shader.default.id} path={"/web/" + shader.default.slug} render={() => <Shader frag={shader.default.frag}/>}/>
  </li>
).reverse();

class Web extends Component {
  render() {
    return (
      <div id="content">
       <Router>
        <div>
          <ul>
            {shaderList}
          </ul>
        </div>
       </Router>
      </div>
    );
  }
}

export default Web;
