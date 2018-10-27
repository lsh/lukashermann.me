import * as THREE from 'three';
import React, { Component } from 'react';

let fs;

let scene, camera, renderer;

let geometry, material, mesh;

let uniforms = {
  time: {type: 'f', value: 1.0},
  resolution: {type: 'v2', value: new THREE.Vector2()},
  mouse: {type: 'v2', value: new THREE.Vector2()}
}

function init() {
  scene = new THREE.Scene();
  camera = new THREE.Camera();
  camera.position.z = -1;
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  document.querySelector('#canvas').appendChild(renderer.domElement);

  geometry = new THREE.PlaneBufferGeometry(2,2);

  material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader:
      `void main()
      {
        gl_Position = vec4(position, 1.0);
      }`,
    fragmentShader: fs
  });

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  onWindowResize();
  window.addEventListener('resize', onWindowResize, false);

  document.onmousemove = function(e) {
    uniforms.mouse.value.x = e.pageX;
    uniforms.mouse.value.x = e.pageY;
  }
}

function onWindowResize(e){
  renderer.setSize(document.querySelector('#canvas').clientWidth, document.querySelector('#canvas').clientWidth*(2/3));
  uniforms.resolution.value.x = renderer.domElement.width;
  uniforms.resolution.value.y = renderer.domElement.height;
} 

function renderShader() {
  requestAnimationFrame(renderShader);
  uniforms.time.value += .005;
  renderer.render(scene, camera);
}

class Shader extends Component {
  componentDidMount(props) {
    fs = this.props.frag;
    init();
    renderShader();
  }

  componentWillUnmount() {
    if (scene.children.length >= 0) {
      scene.remove(mesh);
      geometry.dispose();
    }
    renderer.renderLists.dispose();
    uniforms.time.value = 0;
  }

  render() {
    return (
      <div id="canvas" style={{width: '100%'}}></div>
    );
  }
}

export default Shader;
