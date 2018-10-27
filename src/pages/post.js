import React, { Component } from 'react';
import Markdown from 'markdown-to-jsx';

class Post extends Component {
  render() {
    return (
      <div id="content">
        <h1>{this.props.name}</h1>
        <Markdown>
          {this.props.text}
        </Markdown>
      </div>
    );
  }
}

export default Post;
