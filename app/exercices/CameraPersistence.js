// @flow
import React, { Component } from "react";
import { Surface } from "gl-react-expo";
import { Node, Shaders, GLSL, Uniform, LinearCopy } from "gl-react";
import { withKnobs, ensureCameraPermissions } from "../decorators";
import { GLCamera } from "./CameraInGL";

/**
 * What interesting feature to use from (Web)GL is backbuffering.
 * This is the concept of feeding back in the previous pixels output.
 * We'll implement <Persistence> a gl-react component that produce this effect on whatever children you pass-in.
 *
 * Your goal in this exercice this time is to actually implement the Shader code
 * you will need to use this pieces together:
 * - texture2D(children, uv) that returns the camera pixel color
 * - texture2D(backbuffer, uv) that returns the PREVIOUS pixel color
 * - mix(c1, c2, x) function of glsl, it blends 2 colors based on a x parameter
 *
 * (optional) MEDIUM: use offsetY
 * - introduce a uniform float offsetY
 * - use it to offset the y position of uv but only for the backbuffer lookup
 * - help: `+ vec2(0.0, offsetY)`
 *
 * (optional) ADVANCED: try to also introduce a new `uniform vec3 color`:
 * - you can simply add it (NB it's a vec3, but you can turn it a vec4 with `vec4(c, 1.0)`)
 * - you can do more fancy blending like try to do `(color + 1.0) * pixelColor`
 */

const shaders = Shaders.create({
  persistence: {
    frag: GLSL`
precision highp float;
varying vec2 uv;

uniform sampler2D children, backbuffer;
uniform float persistence;

void main() {

  gl_FragColor = texture2D(children, uv);

}
    `
  }
});

export const Persistence = ({ children, persistence, color, offsetY }: *) => (
  <Node
    shader={shaders.persistence}
    backbuffering /* NB backbuffering enable the backbuffer capability */
    uniforms={{
      backbuffer: Uniform.Backbuffer, // special symbol in gl-react to point to Node's previous texture
      persistence,
      children,
      color
    }}
  />
);

class Exercice extends Component<*> {
  static TODO_REMOVE_ME = 1; // REMOVE THIS LINE !!!

  render() {
    const { persistence, color, offsetY } = this.props;
    // side note: we need to use a LinearCopy here because we can't do backbuffering at the root level
    return (
      <Surface style={{ width: 200, height: 300 }}>
        <LinearCopy>
          <Persistence
            persistence={persistence}
            color={color}
            offsetY={offsetY}
          >
            <GLCamera position="front" />
          </Persistence>
        </LinearCopy>
      </Surface>
    );
  }
}

export default withKnobs(ensureCameraPermissions(Exercice), {
  persistence: {
    label: "Persistence",
    type: "range",
    min: 0,
    max: 1.1
  },
  offsetY: {
    label: "offsetY",
    type: "range",
    min: 0,
    max: 0.02,
    initialValue: 0
  },
  color: {
    label: "color",
    type: "rgbColorSlider",
    initialValue: [0, 0, 0]
  }
});
