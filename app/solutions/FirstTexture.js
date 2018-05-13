// @flow
import React, { Component } from "react";
import { Node, Shaders, GLSL } from "gl-react";
import { Surface } from "gl-react-expo";

import * as landscapes from "../images/landscapes";

const shaders = Shaders.create({
  image: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform sampler2D image;

void main() {
  gl_FragColor = texture2D(image, uv);
}
  `
  }
});

class Exercice extends Component<*> {
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
