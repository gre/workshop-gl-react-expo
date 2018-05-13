// @flow
import React, { Component } from "react";
import { Node, GLSL, Shaders } from "gl-react";
import { Surface } from "gl-react-expo";
import { withKnobs } from "../decorators";

/**
 * use the `value` uniform to make more interesting effects (feel free to experiment).
 You can try to draw some shapes based on this value?
 *
 * for a start, try to use `step(value, uv.x)` somewhere
 *
 * feel free to diverge from the actual "Goal" :)
 *
 * ADVANCED: If you want to experiment more sophisticated drawings:
 * - https://thebookofshaders.com/
 * - https://www.shadertoy.com/
 */

const shaders = Shaders.create({
  helloSlide: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform float value;

void main() {
  gl_FragColor = vec4(uv.x, uv.y, value, 1.0);
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
  static TODO_REMOVE_ME = 1; // REMOVE THIS LINE !!!

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
