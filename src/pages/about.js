import React from 'react';
import Style from '../styles/about.module.css'

export default function About() {
    return(
        <div className={Style.about}>
	    <img src="/portrait.jpg" alt="portrait" />
            <h1>About</h1>
            <p>I am an designer and developer currently studying architecture at Carnegie Mellon University.
            I have experience working with physical installation art, live performance, web design, graphic design, animation & WebGL.
            You can see a lot of my work on <a href="http://instagram.com/lukashermann_">Instagram</a>, and browse my code on <a href="http://github.com/lsh">GitHub</a>.</p>
        </div>
    )
}
