// @flow
import React, { Component } from "react";
import { Node, Shaders, GLSL } from "gl-react";
import { Surface } from "gl-react-expo";

import * as landscapes from "../images/landscapes";

/**
 * Let's see how we can render textures in GLSL.
 * you can accept a sampler2D uniform image in your glsl shader.
 * the gl_FragColor pixel value to set must comes from the image.
 * TODO:
 * use the `texture2D` build-in function of GLSL to render the image.
 * this function looks up a sampler2D at a given coordinate.
 * it takes 2 parameters: texture2D(sampler2D, vec2)
 * try to use it with `image` and `uv`
 *
 * BONUS: try to use a different vec2 value, for instance try `uv * uv`
 */

const shaders = Shaders.create({
  image: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform sampler2D image;

void main() {
  gl_FragColor = vec4(1.);
}
  `
  }
});

class Exercice extends Component<*> {
  static TODO_REMOVE_ME = 1; // REMOVE THIS LINE !!!

  render() {
    const image = landscapes.mongolfier;
    return (
      <Surface style={{ width: 300, height: 300 }}>
        <Node shader={shaders.image} uniforms={{ image }} />
      </Surface>
    );
  }
}

export default Exercice;
