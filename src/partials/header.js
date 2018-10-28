import React, {Component} from 'react';
import {BrowserRouter as Router, Route, NavLink} from "react-router-dom"

import Architecture from './../pages/architecture.js';
import Home from './../pages/home.js'
import Web from './../pages/web.js'
import Live from './../pages/live.js'

class Header extends Component {
  render() {
    return (
    <Router>
      <div>
        <div id="nav">
          <NavLink exact to="/" activeStyle={{color: '#ffffff', background: '#000000'}}>LUKAS HERMANN</NavLink>
          <NavLink exact to="/web/" activeStyle={{color: '#ffffff', background: '#000000'}}>WEB</NavLink>
          <NavLink exact to="/live/" activeStyle={{color: '#ffffff', background: '#000000'}}>LIVE</NavLink>
          <NavLink exact to="/arch/" activeStyle={{color: '#ffffff', background: '#000000'}}>ARCHITECTURE</NavLink>
        </div>

        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/web" component={Web} />
          <Route exact path="/live" component={Live} />
          <Route exact path="/arch" component={Architecture} />
        </div>
      </div>
    </Router>
    );
  }
}

export default Header;
