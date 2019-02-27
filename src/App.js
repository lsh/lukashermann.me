import React, { Component } from 'react';
import {HashRouter as Router, Route, Link, Switch, NavLink} from "react-router-dom";
import Markdown from 'markdown-to-jsx';
import ShadertoyReact from 'shadertoy-react';

//import {TransitionGroup, CSSTransition} from 'react-transition-group';

import About from './about.js';
import Resume from './resume.js'

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


// get all posts from data dir
const req = require.context('./data', true,  /^\.\/.*\.js$/);
const allPosts = req.keys().map(file => req(file).default);
const filteredPosts = allPosts.filter(Boolean);

const makePosts = (data, fn, filter=null) => {
  let tempData;

  if (filter === null) {
    tempData = data;
  } else {
    tempData = data.filter(p => p.type === filter);
  }

  let ps = [];
  tempData.forEach((p) => {
    ps.push(fn(p));
  });

  return ps.reverse();
}

// create the post listing
const postThumbnail = (post) => {
  return <li key={post.id} className="thumbnail">
            <Link to={post.slug} href={post.slug}>
              <img style={{marginTop: '10px'}} alt={post.name} src={"/thumbnails/"+ post.thumbnail} />
            </Link>
          </li>
}


const shaderPost = (post, index) => {
  return <Route key={index} path={"/" + post.slug} render={ (props) =>
    <div id="content">
       <h1>{post.name}</h1>
       <ShadertoyReact fs={post.frag} />
    </div>
  }/>
}

const textPost = (post, index) => {
  return <Route key={index} path={"/" + post.slug} render={ (props) =>
    <div id="content">
       <h1>{post.name}</h1>
       <date>{post.date}</date>
      <Markdown>{post.text}</Markdown>
    </div>
  }/>
}

// post routes
const makeRoutes = (postList) => {
  let routes = [];
  postList.forEach((p, index) => {
    let route;
    if (p.type === 'shader') {
      route = shaderPost(p, index);
    } else {
      route = textPost(p, index);
    }
    routes.push(route);
  });
  return routes;
}
const pr = makeRoutes(filteredPosts);


const filterNav = <div id="filters">
      Filters:
      <NavLink exact to="/" activeClassName='active-nav'>All</NavLink>
      <NavLink exact to="/webgl" activeClassName='active-nav'>WebGL</NavLink>
      <NavLink exact to="/arch" activeClassName='active-nav'>Arch</NavLink>
      <NavLink exact to="/live" activeClassName='active-nav'>Live</NavLink>
    </div>;

// how to render a content list
const homeContent = (postList) => {
  return <div id="content">
    {filterNav}
    <ul>
      {postList}
    </ul>
  </div>
}

class App extends Component {
  render() {
    return (
    <div>
      <Header />
      <Router basename="">
        <Switch>
            <Route exact path="/about" component={About}/>
            <Route exact path="/resume" component={Resume}/>
            {pr}

            <Route exact path="/" render={() => {
                   return homeContent(
                    makePosts(filteredPosts, (post) => {
                      return postThumbnail(post);
                    })
                   );
               }
             } />
 
             <Route exact path="/webgl" render={() => {
                   return homeContent(
                    makePosts(filteredPosts, (post) => {
                      return postThumbnail(post);
                    }, 'shader')
                   );
               }
             } />

             <Route exact path="/arch" render={() => {
                   return homeContent(
                    makePosts(filteredPosts, (post) => {
                      return postThumbnail(post);
                    }, 'arch')
                   );
               }
             } />

            <Route exact path="/live" render={() => {
                   return homeContent(
                    makePosts(filteredPosts, (post) => {
                      return postThumbnail(post);
                    }, 'post')
                   );
               }
             } />

        </Switch>
      </Router>
    </div>
    );
  }
}

export default App;