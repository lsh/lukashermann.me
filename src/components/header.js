import React from 'react';
import { Link } from 'gatsby';
import Style from '../styles/nav.module.css';

export default () => (
    <div id="sidebar" className={Style.nav}>
        <Link to="/">
            <h1 className={Style.logobox}>Lukas Hermann</h1>
        </Link>
        <nav className={Style.navBox}>
            <Link to="/about" className={Style.navLink}>About</Link>
            <a rel="noopener noreferrer" target="_blank" className={Style.navLink} href="https://drive.google.com/file/d/1sZP7BUPbPppp5ETlKa6YT9KqKlezUIVk/view">Resume</a>
        </nav>
    </div>
);
