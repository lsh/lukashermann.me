import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom"
import archposts from './../architecture/contents.js';
import Markdown from 'markdown-to-jsx';

const postList = archposts.map((post) =>
  <li key={post.default.id}>
      <Link to={"/arch/" + post.default.slug}>{post.default.name}</Link>
  </li>
).reverse();



const posts = archposts.map((post) =>
<Route path={"/arch/" + post.default.slug} render={() =>
    <div key={post.default.id} >
      <h1>{post.default.name}</h1>
      <Markdown>{post.default.text}</Markdown>
    </div>
  } />
);

class Architecture extends Component {
  render() {
    return (
      <div id="content">
        <Router>
          <Switch>
            <Route exact path="/arch/" render={() => 
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

export default Architecture;
