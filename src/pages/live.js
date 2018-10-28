import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom"
import liveposts from './../live/contents.js';
import Markdown from 'markdown-to-jsx';

const postList = liveposts.map((post) =>
  <li key={post.default.id}>
      <Link to={"/live/" + post.default.slug}>{post.default.name}</Link>
  </li>
).reverse();



const posts = liveposts.map((post) =>
<Route path={"/live/" + post.default.slug} render={() =>
    <div key={post.default.id} >
      <h1>{post.default.name}</h1>
      <Markdown>{post.default.text}</Markdown>
    </div>
  } />
);

class Live extends Component {
  render() {
    return (
      <div id="content">
        <Router>
          <Switch>
            <Route exact path="/live/" render={() => 
              <ul>
                {postList}
              </ul>
            } />
            {posts}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Live;
