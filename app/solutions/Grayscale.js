import React, { Component } from "react";
import { GLSL, Node, Shaders } from "gl-react";
import { Surface } from "gl-react-expo";
import GLImage from "gl-react-image";

import { withKnobs } from "../decorators";
import * as landscapes from "../images/landscapes";

const shaders = Shaders.create({
  grayscale: {
    frag: GLSL`
precision highp float;
varying vec2 uv;

uniform sampler2D children;

float greyscale (vec3 c) {
  return 0.2125 * c.r + 0.7154 * c.g + 0.0721 * c.b;
}

void main() {
  vec4 color = texture2D(children, uv);
  float grey = greyscale(color.rgb);
  gl_FragColor = vec4(grey, grey, grey, 1.0);
}
`
  }
});

export const Grayscale = ({ children }) => (
  <Node shader={shaders.grayscale} uniforms={{ children }} />
);

class Exercice extends Component<*> {
  render() {
    const { colorScale, image } = this.props;
    return (
      <Surface style={{ width: 300, height: 300 }}>
        <Grayscale>
          <GLImage source={image} />
        </Grayscale>
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
