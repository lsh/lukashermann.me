import React, { Component } from 'react';
import {HashRouter as Router, Route, Link, Switch, NavLink} from "react-router-dom";
import Markdown from 'markdown-to-jsx'; 
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
  <Route key={post.default.id} path={`post.default.slug`} component={About} />
);

class App extends Component {
  
  render() {
    return (
    <div>
      <Header />
      <Router>
        <Switch>
            <Route exact path="/about" component={About}/>
            <Route exact path="/" render={() =>
              <div id="content">
                <ul>
                  {postList}
                </ul>
              </div>
            } />
            {postRoutes}
        </Switch>
      </Router>
    </div>
    );
  }
}

export default App;
