---
name: "Hivemind"
date: '2018-10-31'
type: 'shader'
slug: "hivemind"
thumbnail: thumbnail.png 
---
	#define r(p, a) {p = cos(a)*p + sin(a) * vec2(p.y, -p.x);}
	uniform vec2 resolution;
	uniform float time;
	vec3 hsv(float h, float s, float v)
	{
		return mix( vec3( 1.0 ), clamp( ( abs( fract(
			h + vec3( 3.0, 2.0, 1.0 ) / 3.0 ) * 6.0 - 3.0 ) - 1.0 ), 0.0, 1.0 ), s ) * v;
	}
	void main()
	{
			float x, T=time;
			vec2 R = resolution;
			vec4 p = vec4((2.*gl_FragCoord.xy-R)/R.y, -.5, -.5), d;
			r(p.xy, T*.5);
			d=normalize(p);
			for (float i = 1.; i > 0.; i -= 0.01)
			{
					x = length(cos(p.xy*.5)-vec2(cos(p.z*.5- T), sin(p.z*.5 - T))) - .2;
					gl_FragColor = vec4(i*i)*vec4(hsv(distance(p, d), 1., 1.), 1.);
					if (x < 0.005) break;
					p-=d*x;
			}
	}