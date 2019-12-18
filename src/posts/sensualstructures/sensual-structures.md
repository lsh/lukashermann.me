---
name: "Sensual Structures"
date: '2018-12-13'
type: 'shader'
thumbnail: thumbnail.png
slug: "sensual-structures"
---

uniform vec2 resolution;
uniform float time;
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


  mat2 r(float a)
  {
      float c = cos(a), s = sin(a);
      return mat2(c, -s, s, c);
  }

  float box(vec3 p, vec3 b)
  {
      vec3 d = abs(p) - b;
      return min(max(d.x, max(d.y, d.z)), 0.) + length(max(d, 0.));
  }

  float fftsmooth(float a, float s)
  {
      //from nick shelton
      //FFT_smooth_n = FFTRaw_n * alpha + FFT_smooth_n-1 * (1 - alpha)
      float audio = s;
      return audio * a + audio-1. * (1.-a);
      
  }

  float map(vec3 p)
  {
      float t = time*.5;
      p += dot(p,p)*.04;
      //p = abs(p);
      vec3 q = p;
      
      float d = 0.;
      p.z += 1.5;
      p.y += cos(p.x*.3 + t);
      p.z -= cos(p.x*.4);
      p.z = mod(p.z, 2.)-1.;
      p.x -= t;
      p.x = mod(p.x, 2.)-1.;
      //p.y = mod(p.y, 4.)-2.;
      float depth = .1 - .01;
      d = box(p, vec3(depth, 1., depth));
      d = min(d, box(abs(p) - vec3(0, 1., 0), vec3(1., depth, depth)));
      
      p = q;
      p.z += 2.0;
      p.z -= cos(p.x*.4);  
      p.x += cos(p.y*.2 + t);
      p.y -= t;
      p.y = mod(p.y, 2.)-1.0;
      p.z = mod(p.z, 2.)-1.;
      vec3 z = p;
      p.x = mod(p.x, 4.)-2.; 
      d = min(d, box(p, vec3(1.0, depth, depth)));
      
      p = z;
      p.x = abs(p.x) - 1.;
      p.x = mod(p.x, 4.0)-2.;
      d = min(d, box(p, vec3(depth, 1.0, depth)));
      p = z;
      p.x = abs(p.x) + 1.;
      p.x = mod(p.x, 4.0)-2.;
      d = min(d, box(p, vec3(depth, 1.0, depth)));
      return d;
  }

  float trace(vec3 ro, vec3 rd)
  {
      float t = 0.;
      for (int i = 0; i < 100; i++)
      {
          vec3 p = ro + rd * t;
          float m = map(p)*.5;
          t += abs(m);
          if (t > 20.0 || m < .005) break;
      }
      return t;
  }

  vec3 calcNormal(vec3 p)
  {
      vec2 e = vec2(0.005, 0);
      return normalize(vec3(
          map(p+e.xyy)-map(p-e.xyy),
          map(p+e.yxy)-map(p-e.yxy),
          map(p+e.yyx)-map(p-e.yyx)));
  }

  void main(void)
  {
      vec2 uv = (2.*gl_FragCoord.xy-resolution.xy)/resolution.y;
      vec3 ro = vec3(0, 0, 1), rd = normalize(vec3(uv, -1));
      //rd.xy *= r(atan(uv.y, uv.x)*2.);
      float t = trace(ro, rd);
      vec3 p = ro + rd * t,
      n = calcNormal(p),
      lp = vec3(0, 0, 2), ld = normalize(lp - p);
      vec3 col = vec3(1.0) * dot(ld, n);
      col = mix(1.-col*.3, vec3(1.), smoothstep(5., 7., t));
      col.b = 0.;
      col = hue(vec4(col, 1.), t*.2).rgb;
      gl_FragColor = vec4(col, 1.0);
  }