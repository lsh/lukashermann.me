import React, { Component, Fragment } from 'react';
import {HashRouter as Router, Route, Link, Switch, NavLink} from "react-router-dom";
import Markdown from 'markdown-to-jsx';
import ShadertoyReact from 'shadertoy-react';

import About from './about.js';

//import {TransitionGroup, CSSTransition} from 'react-transition-group'; //import Resume from './resume.js'

class Header extends Component {
  render() {
    return (
    <Router>
      <div>
        <div id="nav">
          <NavLink exact to="/"><div id="logo">LUKAS HERMANN</div></NavLink>
          <div id="navlinks">
            <NavLink exact to="/about">ABOUT</NavLink>
            <a href="https://drive.google.com/file/d/1zqrmCUgZdygxt7pYpDnGVlXU14sB7j4Z/view?usp=sharing">RESUME</a>
          </div>
        </div>
      </div>
    </Router>
    );
  }
}

function Thumbnail(props) {
    return(
        <li className="thumbnail" >
            <Link to={props.path} href={props.path} >
                <img style={{marginTop: '10px'}} alt={props.name} src={"/thumbnails/" + props.thumbnail} />
            </Link>
        </li>
    );
}

function Gallery(props) {
    const filter = props.data.filter(post => (
        post.type === props.location.pathname.substring(1) || props.location.pathname === '/'
    ));
    const data = filter.map((post, index) => {
        return <Thumbnail key={index} path={post.slug} name={post.name} thumbnail={post.thumbnail} />
    });
    return(<div>{data}</div>);
}

function Filters(props) {
    return (<div id="filters">
	Filters:
	    <Route key={'nonekey'} path={'/'} render={(props) => (
		<NavLink exact to={'/'} activeClassName='active-nav'>None</NavLink>
	    )} />
	    <Route key={'shaderkey'} path={'/'} render={(props) => (
		<NavLink exact to={'/shader'} activeClassName='active-nav'>Shader</NavLink>
	    )} />
	    <Route key={'archkey'} path={'/'} render={(props) => (
		<NavLink exact to={'/arch'} activeClassName='active-nav'>Arch</NavLink>
	    )} />
	    <Route key={'livekey'} path={'/'} render={(props) => (
		<NavLink exact to={'/live'} activeClassName='active-nav'>Live</NavLink>
	    )} />
	    </div>);
}

class App extends Component {
  constructor() {
      super();
      this.state = {
          data: [],
          filters: [
            ["/" , "All"],
            ["/shader" , "shaders"],
            ["/arch" , "Arch"],
            ["/live" , "Live"],
          ]
      };
  }

  async componentDidMount() {
    // Get all posts from data dir
    const req = require.context('./data', true,  /^\.\/.*\.js$/);
    const allPosts = req.keys().map(file => req(file).default);

    const filteredPosts = allPosts.reverse().filter(Boolean);

    this.setState({ data: filteredPosts });
  }

  render() {
    return (
    <div>
      <Header />
      <Router basename="">
          <div>
            <Route exact path="/about" component={About}/>

            {this.state.data.map((post, index) => {
                if (post.type === 'shader')
                    return(
                            <Route key={index} exact path={'/' + post.slug} render={ (props) => (
                                <div id="content">
                                    <h1>{post.name}</h1>
                                    <ShadertoyReact fs={post.frag} />
                                </div>
                            )}/>
                        );
                    else
                    return(
                            <Route key={index} exact path={'/' + post.slug} render={ (props) => (
                                <div id="content">
                                    <h1>{post.name}</h1>
                                    <p className="date">{post.date}</p>
                                    <Markdown>{post.text}</Markdown>
                                </div>
                            )}/>
                        );
                })}

            <div id="content">
	    {this.state.filters.map(([url, text], index) => (
	    <Route exact path={url} render={(props) => (
		<Filters />
	    )} />
	    ))}

                <ul>
                    {this.state.filters.map(([url, text], index) => (
                        <Route exact key={index} path={url} render={(props) => (
                            <div>
                                <Gallery data={this.state.data} location={props.location} />
                            </div>
                        )}/>
                    ))}
                </ul>
            </div>

        </div>
      </Router>
    </div>
    );
  }
}

export default App;
