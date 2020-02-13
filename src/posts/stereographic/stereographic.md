---
name: "Stereographic"
date: '2019-01-04'
type: 'shader'
thumbnail: thumbnail.jpg
slug: "stereographic"
---

uniform float time;
uniform vec2 resolution;

  #define eps (.02)
  #define NEAR 3.
  #define FAR 8.
  
  // From netgrind & connor bell
  vec4 hue(vec4 color, float shift) {
  
      const vec4  kRGBToYPrime = vec4 (0.299, 0.587, 0.114, 0.0);
      const vec4  kRGBToI     = vec4 (0.596, -0.275, -0.321, 0.0);
      const vec4  kRGBToQ     = vec4 (0.212, -0.523, 0.311, 0.0);
  
      const vec4  kYIQToR   = vec4 (1.0, 0.956, 0.621, 0.0);
      const vec4  kYIQToG   = vec4 (1.0, -0.272, -0.647, 0.0);
      const vec4  kYIQToB   = vec4 (1.0, -1.107, 1.704, 0.0);
  
      // Convert to YIQ
      float   YPrime  = dot (color, kRGBToYPrime);
      float   I      = dot (color, kRGBToI);
      float   Q      = dot (color, kRGBToQ);
  
      // Calculate the hue and chroma
      float   hue     = atan (Q, I);
      float   chroma  = sqrt (I * I + Q * Q);
  
      // Make the user's adjustments
      hue += shift;
  
      // Convert back to YIQ
      Q = chroma * sin (hue);
      I = chroma * cos (hue);
  
      // Convert back to RGB
      vec4    yIQ   = vec4 (YPrime, I, Q, 0.0);
      color.r = dot (yIQ, kYIQToR);
      color.g = dot (yIQ, kYIQToG);
      color.b = dot (yIQ, kYIQToB);
  
      return color;
  }
  
  float hash(float n) { return fract(sin(n) * 1e4); }
  
  float sdBox(vec3 p, vec3 b)
  {
      vec3 d = abs(p) - b;
      return length(max(d, 0.)) + min(max(d.x, max(d.y, d.z)), 0.);
  }
  mat2 r(float a)
  {
      float c = cos(a), s = sin(a);
      return mat2(c, s, -s, c);
  }
  
  float map(vec3 p)
  {
      //p *= .5;
      float t = time*.5;
      p.xz *= r(t);
      p.xy *= r(p.z*.35 + t);
      vec3 q = p, id;
      p.z -= time;
      float c = 2.0;
      id = floor(p/c);
      p = mod(p, 2.)-1.;
      float d = sdBox(p, vec3(c*.25, c*.35, c*.45));
      if (hash(id.x) < .25)
      {
          return .1;
      } 
      else if (hash(id.y) < .15)
      {
          return .1;
      }
      else if (hash(id.z) < .25)
      {
          return .1;
      }
      return d;
  }
  
  float trace(vec3 ro, vec3 rd)
  {
      float t = 0.;
      for (int i = 0; i < 100; i++)
      {
          vec3 p = ro + rd * t;
          float m = map(p);
          t += m*.75;
          if (t > FAR || m < eps) break;
      }
      return t;
  }
  
  void main()
  {
      vec2 uv = (2.*gl_FragCoord.xy-resolution.xy)/resolution.y;
      
      float divisor = (1.+pow(uv.x, 2.) + pow(uv.y, 2.)),
            x = (2.*uv.x) / divisor,
            y = (2.*uv.y) / divisor,
            z = (-1. + pow(uv.x, 2.) + pow(uv.y, 2.)) / divisor,
            t, den, diff;
      
      vec3 ro = vec3(x, y, z),
           rd = vec3(x,y,z),
           lp = normalize(vec3(3, -3, 5)),
           p, objcol;
      rd.yz *= r(time*.1);
      vec4 bgcol = vec4(0.),
           col;
      
      t = trace(ro, rd);
      p = ro + rd * t;
      den = map(p);
      diff = clamp((map(p+eps*lp)-den)/eps, 0., 1.);
      objcol = diff * vec3(1.);
      col = p.z < FAR ? vec4(objcol, 1.0) : vec4(bgcol.xyz, 1.);
      
      // hiding ends of inf
      col = mix(col, bgcol, smoothstep(NEAR, FAR, t));
      col = mix(col, bgcol, smoothstep(NEAR, FAR, abs(p.x)));
      col = mix(col, bgcol, smoothstep(NEAR, FAR, abs(p.y)));
      col.b = 0.;
      float tt = mod(time, 2.);
      col = hue(col, distance(p, vec3(0)));
      gl_FragColor = col;
  }
