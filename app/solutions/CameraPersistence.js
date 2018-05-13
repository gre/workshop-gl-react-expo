// @flow
import React, { Component } from "react";
import { Surface } from "gl-react-expo";
import { Node, Shaders, GLSL, Uniform, LinearCopy } from "gl-react";
import { withKnobs, ensureCameraPermissions } from "../decorators";
import { GLCamera } from "./CameraInGL";

const shaders = Shaders.create({
  persistence: {
    frag: GLSL`
precision highp float;
varying vec2 uv;

uniform sampler2D children, backbuffer;
uniform vec3 color;
uniform float offsetY;
uniform float persistence;

void main() {
  gl_FragColor = (vec4(color + 1.0, 1.0)) * mix(
    texture2D(children, uv),
    texture2D(backbuffer, uv + vec2(0.0, offsetY)),
    persistence
  );
}
    `
  }
});

export const Persistence = ({
  children,
  persistence,
  color,
  offsetY
}: {
  children: any,
  persistence?: *,
  color?: *,
  offsetY?: *
}) => (
  <Node
    shader={shaders.persistence}
    backbuffering /* NB backbuffering enable the backbuffer capability */
    uniforms={{
      backbuffer: Uniform.Backbuffer, // special symbol in gl-react to point to Node's previous texture
      persistence,
      children,
      offsetY: offsetY || 0,
      color: color || [0, 0, 0]
    }}
  />
);

class Exercice extends Component<*> {
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
