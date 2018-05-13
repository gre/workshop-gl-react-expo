import React, { Component } from "react";
import { GLSL, Node, Shaders } from "gl-react";
import { Surface } from "gl-react-expo";
import GLImage from "gl-react-image";
import { withKnobs } from "../decorators";

import * as landscapes from "../images/landscapes";

/**
 * implement the grayscale rendering of an image
 * use greyscale() function to help you
 */

const shaders = Shaders.create({
  grayscale: {
    frag: GLSL`
precision highp float;
varying vec2 uv;

uniform sampler2D children;

// this function takes a color and returns the grayscale float value
float greyscale (vec3 c) {
  return 0.2125 * c.r + 0.7154 * c.g + 0.0721 * c.b;
}

void main() {
  vec4 color = texture2D(children, uv);
  // TODO
  gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
}
`
  }
});

// notice how we do composition:
// - component takes a children prop
// - inject it as a uniform
export const Grayscale = ({ children }) => (
  <Node shader={shaders.grayscale} uniforms={{ children }} />
);

class Exercice extends Component<*> {
  static TODO_REMOVE_ME = 1; // REMOVE THIS LINE !!!

  render() {
    const { colorScale, image } = this.props;
    return (
      <Surface style={{ width: 300, height: 300 }}>
        {/*
          how can you use Grayscale & GLImage together?
        */}
      </Surface>
    );
  }
}

export default withKnobs(Exercice, {
  image: {
    label: "Image",
    type: "images",
    images: landscapes,
    initialValue: landscapes.mongolfier
  }
});
