// @flow
import React, { Component } from "react";
import { Node, GLSL, Shaders } from "gl-react";
import { Surface } from "gl-react-expo";

/** TODO
 * Let's implement the Hello World of GLSL: "HelloGL"
 * set the RED component to uv.x position
 * set the GREEN component to uv.y position
 * in GLSL, you need to set a gl_FragColor variable to a vec4
 * a vec4 is used for colors: vec4(r, g, b, a)
 */

const shaders = Shaders.create({
  helloGL: {
    frag: GLSL`
precision highp float;
varying vec2 uv;

void main() {
  gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
}
  `
  }
});

class Exercice extends Component<*> {
  static TODO_REMOVE_ME = 1; // REMOVE THIS LINE !!!

  render() {
    return (
      <Surface style={{ width: 300, height: 300 }}>
        <Node shader={shaders.helloGL} />
      </Surface>
    );
  }
}

export default Exercice;
