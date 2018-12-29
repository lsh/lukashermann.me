import React, { Component } from 'react';
import ShadertoyReact from 'shadertoy-react';

const fs = 
`
#define SPEED .25
#define PI 3.1415926

mat2 r(float a)
{
  float c = cos(a), s = sin(a);
  return mat2(c, -s, s, c);
} float smin( float a, float b, float k )
{
  float h = clamp( 0.5+0.5*(b-a)/k, 0.0, 1.0 );
  return mix( b, a, h ) - k*h*(1.0-h);
}
float sdBox( vec3 p, vec3 b )
{
  vec3 d = abs(p) - b;
  return min(max(d.x,max(d.y,d.z)),0.0) + length(max(d,0.0));
}
float sdPlane( vec3 p, vec4 n )
{
  // n must be normalized
  return dot(p,n.xyz) + n.w;
}
float house1(vec3 p, float s)
{
  vec3 q = p;
  p.xz = abs(p.xz) - 2.;
  float d = sdBox(p, vec3(.35*s, 2.9*s, .35*s));
  p = q;
  d = smin(d, sdBox(p, vec3(s*3.5, .2, s*2.5)), .2);
  return d;
}
float map(vec3 p)
{
  float d = 0.;
  vec3 q = p;
  p.yz *= r(p.x*.05);
  p.yz *= r(-PI / 6.);
  p = q;
  p.xy *= r(p.z*.12 + iMouse.y * .01);
  //float cell = floor(p.y/3.);
  p.y -= iTime;
  p.z += 4.5;
  p.x -= 3.;
  p.xz *= r(PI / 6. + iMouse.x * .01);
  p.y = mod(p.y, 3.)-1.5;
  p.xz = mod(p.xz+5., 10.)-5.;
  d = house1(p, 1.);
  p = q;
  //d = smin(d, sdPlane(vec3(p.x, p.y + 2.5, p.z), vec4(0, 1, 0, 1)), .5);
  return d;
}
vec3 getNormal(vec3 p)
{
  vec2 e = vec2(1e-3, 0);
  return normalize(vec3(
        map(p+e.xyy)-map(p-e.xyy),
        map(p+e.yxy)-map(p-e.yxy),
        map(p+e.yyx)-map(p-e.yyx)));
}
void main()
{
  vec2 u = (2.*gl_FragCoord.xy-iResolution.xy)/iResolution.y;
  vec3 ro = vec3(0, 0, 0),
       rd = normalize(vec3(u, -1)),
       p = ro-ro,
       n = p,
       ld = n,
       lp = vec3(.5,.3, .1);
  float t = 0.;
  //rd.xy = abs(rd.xy);
  for (int i = 0; i < 80; i++)
  {
    p = ro + rd * t;
    float x = map(p);
    t += x*.75;
    if (t > 40. || x < 1e-3) break;
  }
  n = getNormal(p);
  ld = normalize(lp - p);
  vec3 col = vec3(1.-t/30.) + dot(ld, n)*.1;
  col = mix(col, vec3(1.), smoothstep(15., 30., t));
  col = mix(col, vec3(1.), smoothstep(.0, 2.5, 1.-u.y));
  col = mix(col, vec3(1.), smoothstep(0., 2.5, 1.-u.x));
  gl_FragColor = vec4(col, 1.0);
}
`;

class About extends Component {
  render() {
    return (
      <div id="content">
        <h1>About</h1>
				I am an artist & designer currently studying architecture at Carnegie Mellon University.
				I have experience working with physical installation art, live performance, web design, graphic design, animation & WebGL.
				You can see a lot of my work on <a href="http://instagram.com/lukashermann_">Instagram</a>, and browse my code on <a href="http://github.com/lsh">GitHub</a>.
        <ShadertoyReact fs={fs} />
      </div>
    );
  }
}

export default About;
