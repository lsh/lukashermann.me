import * as THREE from 'three';
import React, { Component } from 'react';

let scene, camera, renderer;

let uniforms = {
  time: {type: 'f', value: 1.0},
  resolution: {type: 'v2', value: new THREE.Vector2()},
  mouse: {type: 'v2', value: new THREE.Vector2()}
}

class Shader extends Component {

  componentDidMount(props) {
    const fs = this.props.frag;

    init();
    render();

    function init() {
      scene = new THREE.Scene();
      camera = new THREE.Camera();
      camera.position.z = -1;
      renderer = new THREE.WebGLRenderer({
        antialias: true
      });
      document.querySelector('#canvas').appendChild(renderer.domElement);

      const geometry = new THREE.PlaneBufferGeometry(2,2);

      let material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader:
          `void main()
          {
            gl_Position = vec4(position, 1.0);
          }`,
        fragmentShader: fs
      });

      let mesh = new THREE.Mesh(geometry, material);
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

    function render() {
      requestAnimationFrame(render);
      uniforms.time.value += .05;
      renderer.render(scene, camera);
    }
  }

  componentWillMount(props) {
  }

  render() {
    return (
      <div id="canvas" style={{width: '100%'}}></div>
    );
  }
}

export default Shader;
