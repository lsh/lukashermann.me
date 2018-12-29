import React, { Component } from 'react';
import {HashRouter as Router, Route, Link, Switch, NavLink} from "react-router-dom";
import Markdown from 'markdown-to-jsx'; 
import ShadertoyReact from 'shadertoy-react';

import About from './about.js';
import posts from "./data/contents.js";

class Header extends Component {
  render() {
    return (
    <Router>
      <div>
        <div id="nav">
          <NavLink exact to="/" activeStyle={{color: '#ffffff', background: '#000000'}}>LUKAS HERMANN</NavLink>
          <NavLink exact to="/about" activeStyle={{color: '#ffffff', background: '#000000'}}>ABOUT</NavLink>
          <NavLink exact to="/resume" activeStyle={{color: '#ffffff', background: '#000000'}}>RESUME</NavLink>
        </div>
      </div>
    </Router>
    );
  }
}

const postList = posts.map((post) =>
  <li key={post.default.id}>
      <Link to={post.default.slug}>{post.default.name}</Link>
  </li>
);

const postRoutes = posts.map((post) =>
  {
    if (post.default.type == 'shader') {
      <Route key={post.default.id} path={"/" + post.default.slug} render={
        (props) =>
        <div id="content">
          <h1>{post.default.name}</h1>
          <ShadertoyReact fs={post.default.frag} />
        </div>
      }/>
    } else {
      <Route key={post.default.id} path={"/" + post.default.slug} render={
        (props) =>
        <div id="content">
          <h1>{post.default.name}</h1>
          <Markdown>{post.default.text}</Markdown>
        </div>
      }/>
    }
  }
);


class App extends Component {
  componentDidMount() {
    console.log('hi')
  }
  
  render() {
    return (
    <div>
      <Header />
      <Router>
        <Switch>
            <Route exact path="/about" component={About}/>
            {postRoutes}
            <Route exact path="/" render={() =>
              <div id="content">
                <ul>
                  {postList}
                </ul>
              </div>
            } />
        </Switch>
      </Router>
    </div>
    );
  }
}

export default App;
