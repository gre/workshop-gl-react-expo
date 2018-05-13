// @flow
import React, { Component } from "react";
import { Node, GLSL, Shaders } from "gl-react";
import { Surface } from "gl-react-expo";

import { withKnobs } from "../decorators";

const shaders = Shaders.create({
  helloSlide: {
    frag: GLSL`
precision highp float;
varying vec2 uv;

uniform float value;

void main() {
  gl_FragColor = vec4(uv.x, uv.y, step(value, uv.x), 1.0);
}
  `
  }
});
export class HelloSlide extends Component<{ value: number }> {
  render() {
    const { value } = this.props;
    return <Node shader={shaders.helloSlide} uniforms={{ value }} />;
  }
}

class Exercice extends Component<*> {
  render() {
    const { value } = this.props;
    return (
      <Surface style={{ width: 300, height: 300 }}>
        <HelloSlide value={value} />
      </Surface>
    );
  }
}

export default withKnobs(Exercice, {
  value: {
    label: "Slide",
    type: "range",
    min: 0,
    max: 1,
    initialValue: 0.5,
    live: true
  }
});
