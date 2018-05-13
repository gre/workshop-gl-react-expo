// @flow
import React, { Component } from "react";
import { Node, GLSL, Shaders } from "gl-react";
import { Surface } from "gl-react-expo";
import { withKnobs } from "../decorators";

/** TODO
 * In the GLSL, you need to declare a `uniform float` called `blue`,...
 * then you need to use it to vary the blue color.
 *
 * NB: not only you need to declare it but you need to provide a value,
 * otherwise GLSL will still complain about "uniform 'blue' is not declared"
 */

const shaders = Shaders.create({
  helloBlue: {
    frag: GLSL`
precision highp float;
varying vec2 uv;

void main() {
  gl_FragColor = vec4(uv.x, uv.y, 0.0, 1.0);
}
  `
  }
});

// we can define a React component that will render the <Node>
// iit abstracts things a bit so you can easily <HelloBlue>
const HelloBlue = ({ blue }: { blue: number }) => (
  <Node shader={shaders.helloBlue} uniforms={{ blue }} />
);

class Exercice extends Component<*> {
  static TODO_REMOVE_ME = 1; // REMOVE THIS LINE !!!

  render() {
    const { blue } = this.props;
    return (
      <Surface style={{ width: 300, height: 300 }}>
        <HelloBlue />
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
