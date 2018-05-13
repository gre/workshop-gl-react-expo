// @flow
import React, { Component } from "react";
import { Node, GLSL, Shaders } from "gl-react";
import { Surface } from "gl-react-expo";

import { withKnobs } from "../decorators";

const shaders = Shaders.create({
  helloBlue: {
    frag: GLSL`
precision highp float;
varying vec2 uv;

uniform float blue;

void main() {
  gl_FragColor = vec4(uv.x, uv.y, blue, 1.0);
}
  `
  }
});

const HelloBlue = ({ blue }: { blue: number }) => (
  <Node shader={shaders.helloBlue} uniforms={{ blue }} />
);

class Exercice extends Component<*> {
  render() {
    const { blue } = this.props;
    return (
      <Surface style={{ width: 300, height: 300 }}>
        <HelloBlue blue={blue} />
      </Surface>
    );
  }
}

export default withKnobs(Exercice, {
  blue: {
    label: "Blue",
    type: "range",
    min: 0,
    max: 1,
    initialValue: 0.5,
    live: true
  }
});
