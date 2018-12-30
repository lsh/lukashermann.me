import React, { Component } from 'react';

class Resume extends Component {
  render() {
    return (
      <div id="content">
      <h1>Resume</h1>

      <div id="resume-intro">
        <h2>Lukas Hermann</h2>
        <p>Architectural Design + New Media Art</p>
      </div>
      
      <div id="resume-experience">

        <h2>Experience</h2>

        <div class="resume-item">
          <div class="resume-item-title">VR Typography Research Assistance</div>
          <div class="resume-item-date">2018-2019 Pittsburgh, PA</div>
          <div class="resume-item-desc">-Implemented VR web app for a collaboration between the School of Design & School of Architecture</div>
          <div class="resume-item-desc">-Coded in WebGL & AFRAME</div>
        </div>

        <div class="resume-item">
          <div class="resume-item-title">Undergraduate Arts & Design Assistant</div>
          <div class="resume-item-date">2018-2019 Pittsburgh, PA</div>
          <div class="resume-item-desc">-Designed branding for CMU School of Architecture related events</div>
          <div class="resume-item-desc">-Designed posters related to branding</div>
          <div class="resume-item-desc">-Managed web assets related to the school</div>
        </div>

        <div class="resume-item">
          <div class="resume-item-title">Full Stack Developer at Processly</div>
          <div class="resume-item-date">2018 Pittsburgh, PA</div>
          <div class="resume-item-desc">-Implemented front end of sandbox utility</div>
          <div class="resume-item-desc">-Linked the front end to the back end of the app</div>
          <div class="resume-item-desc">-Helped design user interactions</div>
        </div>

        <div class="resume-item">
          <div class="resume-item-title">Installation & Media Artist at Wats:ON Festival</div>
          <div class="resume-item-date">2017 Pittsburgh, PA</div>
          <div class="resume-item-desc">-Created projection installations in GLSL running on
Raspberry Pi microcomputers</div>
          <div class="resume-item-desc">-Created gifs and images for use in event related
activities</div>
        </div>

        <div class="resume-item">
          <div class="resume-item-title">VJ for Smacked Records</div>
          <div class="resume-item-date">2017 Ithaca, NY</div>
          <div class="resume-item-desc">-Ran visual set during musicians’s sets during festivals and select tour
events</div>
          <div class="resume-item-desc">-Created gifs and images for use in event related
activities</div>
        </div>

        <div class="resume-item">
          <div class="resume-item-title">Installation Artist for Naked Noise Festival</div>
          <div class="resume-item-date">2017 Ithaca, NY</div>
          <div class="resume-item-desc">-Installed projection art that visually textured musicians playing
during the festival</div>
        </div>
      </div>
      <div id="resume-col2">
      <div id="resume-education">
        <h2>Education</h2>
        <div id="education-info">
          <p>Carnegie Mellon University</p>
          <p>Bachelor&#39;s of Architecture</p>
          <p>Class of 2022</p>
          <p>Concentration in Computer Science</p>
        </div>

        <div class="resume-item-desc">-Relevant coursework:</div>
        <div class="resume-item-desc">-Architectural Design Studio</div>
        <div class="resume-item-desc">-Digital Media I & II</div>
        <div class="resume-item-desc">-Parametric Modelling</div>
        <div class="resume-item-desc">-Scritpting & Parametric Design</div>
      </div>

      <div id="resume-extracurricular">
        <h2>Extra Curricular</h2>
          <div class="resume-item">
            <div class="resume-item-title">Lunar Gala</div>
            <div class="resume-item-date">2017-2018 Pittsburgh, PA</div>
            <div class="resume-item-desc">-Created 22 out of the 26 line videos
shown using WebGL</div>
          </div>

          <div class="resume-item">
            <div class="resume-item-title">WRCT</div>
            <div class="resume-item-date">2018 Pittsburgh, PA</div>
            <div class="resume-item-desc">-VJ’d for various eventws hosted by
the radio</div>
          </div>
      </div>

      <div id="resume-skills">
      </div>
        <h2>Skills</h2>
        <div class="resume-item-desc">-WebGL</div>
        <div class="resume-item-desc">-OpenFrameworks</div>
        <div class="resume-item-desc">-THREEJS</div>
        <div class="resume-item-desc">-AFRAME</div>
        <div class="resume-item-desc">-JavaScript</div>
        <div class="resume-item-desc">-Ruby</div>
        <div class="resume-item-desc">-Python</div>
        <div class="resume-item-desc">-Adobe Suite</div>
        <div class="resume-item-desc">-Rhino</div>
        <div class="resume-item-desc">-Raspberry Pi</div>
        <div class="resume-item-desc">-C/C++</div>
        <div class="resume-item-desc">-C#</div>
      </div>
      </div>
    );
  }
}

export default Resume;
