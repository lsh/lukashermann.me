---
name: "Kalifornia"
date: "2018-03-11"
type: 'shader'
thumbnail: "thumbnail.jpg"
slug: "kalifornia"
---
uniform vec2 resolution;
uniform float time;

#define r(p, a) {p = cos(a)*p + sin(a)*vec2(p.y,-p.x);}

#define T time
float m(vec4 p, out float t)
{
    float d = 1000.;
    float sc = 1.5;
    float o = .2;
    for (int i = 0; i< 7; i++)
    {
        p = abs(p)/dot(p,p)-o;
        r(p.xy, T*.5);
        r(p.zy, T*.5);
        if (p.x + p.y < 0.) p.xy = -p.yx;
        if (p.x + p.z < 0.) p.xz = -p.zx;
        if (p.y + p.z < 0.) p.yz = -p.zy;
        p = p * sc - o * (sc-1.);
        t = distance(p,vec4(0.));
        d = min(d, length(p.xyz)*pow(sc,-float(i)-1.));      
    }
    return d;
}

void main()
{
    float x, ii, t;
    vec2 R = resolution.xy;
    vec4 p = vec4((2.*gl_FragCoord.xy-R)/R.y, -.5, -.5), d;
    vec4 col = vec4(0.);
    d=normalize(p);
    for (float i = 1.;i>0.;i-=0.02)
    {
        x = m(mod(p, 1.)-.5, t);
        //x = m(p, t);
        col = vec4(1.-i*i+x)+abs(sin(vec4(.1, .435, .811, 1.) + T + t))*.4;
        if(x<0.02) break;
        p-=d*x;
    }
    gl_FragColor = vec4(sqrt(col));
}
