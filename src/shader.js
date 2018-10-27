import 'aframe';
import * as THREE from 'three';
import {Entity, Scene} from 'aframe-react';
import React, { Component } from 'react';

const AFRAME = window.AFRAME;

// TO DO: create register shader pipeline
class Shader extends Component {

  componentDidMount() {
    const scene = document.querySelector('a-scene');
    scene.style.height = "400px";
    scene.style.marginTop = "10px";
  }

  componentWillMount(props) {
      const fs = this.props.frag;
      let uniforms = {
        time: {type: 'f', value: 1.0 },
        mouse: {type: 'v2', value: new THREE.Vector2()}
      };
    AFRAME.registerShader('shader', {
        init: function() {
          this.material = this.el.getOrCreateObject3D('mesh').material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader:
           `varying vec2 vUv;
            varying vec3 vNormal;
            vec3 lp = vec3(1, 3, 5);
            varying vec3 ld;

            void main()
            {
              vUv = uv;
              vNormal = normal;
              ld = normalize(lp - position);

              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
            }`,
            fragmentShader: `${fs}`
          });
        },
      },
    );

    AFRAME.registerComponent('plane', {
    });
  }

  render() {
    return (
      <Scene vr-mode-ui={{enabled: false}} background={{color: '#FFBEC1'}} embedded={true}>
        <Entity camera={true} look-controls={{enabled: false}} wasd-controls={{enabled: false}} />
        //<Entity geometry={{primitive: 'plane', width: 1.15, height: .84}} material={{shader: 'shader'}} position={{x: 0, y: 0, z: -.5}}/>
      </Scene>
    );
  }
}

export default Shader;
