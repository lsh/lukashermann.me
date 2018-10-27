import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom"
import liveposts from './../live/contents.js';
import Post from './post.js'

const postList = liveposts.map((post) =>
  <li key={post.default.id}>
      <Link to={"/live/" + post.default.slug}>{post.default.name}</Link>
      <Route path={"/live/" + post.default.slug} render={
        () => <Post name={post.default.name} text={post.default.text}/>
      }/>
  </li>
);

class Live extends Component {
  render() {
    return (
      <div id="content">
        <Router>
          <ul>
            {postList}
          </ul>
        </Router>
      </div>
    );
  }
}

export default Live;
