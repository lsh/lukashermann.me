import React, { Component } from 'react';
import {HashRouter as Router, Route, Link, Switch, NavLink} from "react-router-dom";
import Markdown from 'markdown-to-jsx';
import ShadertoyReact from 'shadertoy-react';

import About from './about.js';
import Resume from './resume.js'
import posts from './data/contents.js';

class Header extends Component {
  render() {
    return (
    <Router>
      <div>
        <div id="nav">
          <NavLink exact to="/"><div id="logo">LUKAS HERMANN</div></NavLink>
          <div id="navlinks">
            <NavLink exact to="/about">ABOUT</NavLink>
            <NavLink exact to="/resume">RESUME</NavLink>
          </div>
        </div>
      </div>
    </Router>
    );
  }
}

const thumbnailmargin = {
  marginTop: '10px',
};

const postList = posts.map((post) =>
  <li key={post.default.id} class="thumbnail">
      <Link to={post.default.slug}>
        <img style={thumbnailmargin} alt={post.default.name} src={"/thumbnails/"+ post.default.thumbnail} />
        {/*<div class="thumbnail-title">{post.default.name}</div>*/}
      </Link>
  </li>
);

const webglList = posts.map((post) =>
  {
    if (post.default.type === 'shader') {
      return <li key={post.default.id} class="thumbnail">
          <Link to={post.default.slug}>
            <img style={thumbnailmargin} alt={post.default.name} src={"/thumbnails/"+ post.default.thumbnail} />
            {/*<div class="thumbnail-title">{post.default.name}</div>*/}
          </Link>
      </li>
    }
  }
);

const archList = posts.map((post) =>
  {
    if (post.default.type === 'arch') {
      return <li key={post.default.id} class="thumbnail">
          <Link to={post.default.slug}>
            <img style={thumbnailmargin} alt={post.default.name} src={"/thumbnails/"+ post.default.thumbnail} />
            {/*<div class="thumbnail-title">{post.default.name}</div>*/}
          </Link>
      </li>
    }
  }
);

const liveList = posts.map((post) =>
  {
    if (post.default.type === 'post') {
      return <li key={post.default.id} class="thumbnail">
          <Link to={post.default.slug}>
            <img style={thumbnailmargin} alt={post.default.name} src={"/thumbnails/"+ post.default.thumbnail} />
            {/*<div class="thumbnail-title">{post.default.name}</div>*/}
          </Link>
      </li>
    }
  }
);

const postRoutes = posts.map((post) =>
  {
    if (post.default.type === 'shader') {
      return <Route key={post.default.id} path={"/" + post.default.slug} render={
        (props) =>
        <div id="content">
          <h1>{post.default.name}</h1>
          <ShadertoyReact fs={post.default.frag} />
        </div>
      }/>
    } else {
      return <Route key={post.default.id} path={"/" + post.default.slug} render={
        (props) =>
        <div id="content">
          <h1>{post.default.name}</h1>
          <date>{post.default.date}</date>
          <Markdown>{post.default.text}</Markdown>
        </div>
      }/>
    }
  }
);

const filterNav = <div id="filters">
      Filters:
      <NavLink exact to="/" activeClassName='active-nav'>All</NavLink>
      <NavLink exact to="/webgl" activeClassName='active-nav'>WebGL</NavLink>
      <NavLink exact to="/arch" activeClassName='active-nav'>Arch</NavLink>
      <NavLink exact to="/live" activeClassName='active-nav'>Live</NavLink>
    </div>;


class App extends Component {
  render() {
    return (
    <div>
      <Header />
      <Router basename="">
        <Switch>
            <Route exact path="/about" component={About}/>
            <Route exact path="/resume" component={Resume}/>
            {postRoutes}

            <Route exact path="/" render={() =>
              <div id="content">
                {filterNav}
                <ul>
                  {postList}
                </ul>
              </div>
            } />

            <Route exact path="/webgl" render={() =>
              <div id="content">
                {filterNav}
                <ul>
                  {webglList}
                </ul>
              </div>
            } />

            <Route exact path="/arch" render={() =>
              <div id="content">
                {filterNav}
                <ul>
                  {archList}
                </ul>
              </div>
            } />


            <Route exact path="/live" render={() =>
              <div id="content">
                {filterNav}
                <ul>
                  {liveList}
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
