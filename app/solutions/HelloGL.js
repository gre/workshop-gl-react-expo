// @flow
import React, { Component } from "react";
import { Node, GLSL, Shaders } from "gl-react";
import { Surface } from "gl-react-expo";

const shaders = Shaders.create({
  helloGL: {
    frag: GLSL`
precision highp float;
varying vec2 uv;

void main() {
  gl_FragColor = vec4(uv.x, uv.y, 0.0, 1.0);
}
  `
  }
});

class Exercice extends Component<*> {
  render() {
    return (
      <Surface style={{ width: 300, height: 300 }}>
        <Node shader={shaders.helloGL} />
      </Surface>
    );
  }
}

export default Exercice;
